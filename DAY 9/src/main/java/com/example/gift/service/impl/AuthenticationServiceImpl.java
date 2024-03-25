package com.example.gift.service.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.gift.dto.request.ForgotPasswordRequest;
import com.example.gift.dto.request.LoginRequest;
import com.example.gift.dto.request.RegisterRequest;
import com.example.gift.dto.response.BasicResponse;
import com.example.gift.dto.response.LoginResponse;
import com.example.gift.model.Token;
import com.example.gift.model.User;
import com.example.gift.repository.TokenRepository;
import com.example.gift.repository.UserRepository;
import com.example.gift.service.AuthenticationService;
import com.example.gift.utils.JwtUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class AuthenticationServiceImpl implements AuthenticationService{
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Override
    public BasicResponse<String> register(RegisterRequest registerRequest) {
        Optional<User> isUserExists = userRepository.findByEmail(registerRequest.getEmail());
        if (isUserExists.isPresent()) {
            return BasicResponse.<String>builder().message("User already exists with email id " + registerRequest.getEmail()).data("").build();
        }

        var user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword())).build();
        userRepository.save(user);
        return BasicResponse.<String>builder().message("User registered successfully").data("").build();
    }

    @Override
    public BasicResponse<LoginResponse> login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().toString());
        var accessToken = jwtUtils.generateToken(claims, user);
        revokeAllUserToken(user);
        saveUserToken(accessToken, user);
        return BasicResponse.<LoginResponse>builder()
                .message("User logged in successfully.")
                .data(LoginResponse.builder().accessToken(accessToken).id(user.getId()).role(user.getRole()).build())
                .build();
    }

    private void saveUserToken(String accessToken, User user) {
        var token = Token.builder().token(accessToken).user(user).expired(false).revoked(false).build();
        tokenRepository.save(token);
    }

    private void revokeAllUserToken(User user) {
        var validUserTokens = tokenRepository.findAllByUser_IdAndRevokedFalseAndExpiredFalse(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    @Override
    public BasicResponse<String> forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        var user = userRepository.findByEmail(forgotPasswordRequest.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (!passwordEncoder.matches( forgotPasswordRequest.getCurrentPAssword(), user.getPassword())) {
            return BasicResponse.<String>builder().message("Wrong password").data("").build();
        }
        if(!forgotPasswordRequest.getNewPassword().equals(forgotPasswordRequest.getConfirmPassword())){
            return BasicResponse.<String>builder().message("Password mismatch").data("").build();
        }
        user.setPassword(passwordEncoder.encode(forgotPasswordRequest.getNewPassword()));
        userRepository.save(user);
        return BasicResponse.<String>builder().message("Password updated successfully.").data("").build();
        // Optional.ofNullable(address).ifPresentOrElse(user.setAddress(null), );;
    }
}
