import { lazy } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LazySuspense from './components/LazySuspense'
import Home from './pages/user/Home'
import AdminHome from './pages/admin/AdminHome'
const LazyLogin = lazy(()=>import("./pages/auth/Login"))
const LazyRegister = lazy(()=>import("./pages/auth/Register"))
const LazyForgotPassword = lazy(()=>import("./pages/auth/ForgetPassword"))
const LazyMain = lazy(()=> import("./pages/user/Main"))
const LazyAdminMain = lazy(()=> import("./pages/admin/AdminMain"))

const UserRoutes = () =>{

  return(
    <LazyMain>
      <Routes>
        <Route path="/home" element={<LazySuspense component={Home}/>}/>
      </Routes>
    </LazyMain>
  )
}

const AdminRoutes = () =>{

  return(
    <LazyAdminMain>
      <Routes>
        <Route path="/home" element={<LazySuspense component={AdminHome}/>}/>
      </Routes>
    </LazyAdminMain>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/login"/>}/>
      <Route path="/app/login" element={<LazySuspense component={LazyLogin}/>} />
      <Route path="/app/register" element={<LazySuspense component={LazyRegister}/>} />
      <Route path="/app/forgot-password" element={<LazySuspense component={LazyForgotPassword}/>} />
      <Route path="/app/user/*" element={<LazySuspense component={UserRoutes}/>} />
      <Route path="/app/admin/*" element={<LazySuspense component={AdminRoutes}/>} />
    </Routes>
  )
}

export default App
