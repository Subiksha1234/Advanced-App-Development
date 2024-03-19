import React from 'react'
import { useSelector } from 'react-redux'
import cartEmpty from '../../assets/images/EmptyCart.gif'
import { useNavigate } from 'react-router-dom'

const Cart = () => {


    let navigate = useNavigate();
    const cart = useSelector((state) => state.cart.value)
    console.log(cart);
    return (
        <>{
            cart.id === -1 ? (
                <div className='bg-slate-300'>
                    <div className='flex justify-center p-6'>
                        <img className='h-80 max-w-lg' src={cartEmpty} autoPlay muted loop />
                    </div>
                    <div className='flex justify-center p-6'>
                        <p className='text-gray-900 text-3xl leading-none font-bold px-2'>THE CART IS EMPTY</p>
                        <img className='h-10 bg-white' src='https://i.pinimg.com/736x/a6/95/e6/a695e63577caa067f6995bd645799602.jpg'></img>
                    </div>
                </div>
            ) : (
                <>
                    <div className='bg-slate-300 px-32 py-5 w-full h-3/4'>
                        {/* <p>{cart.title}</p> */}
                        <div className="max-w-sm w-full lg:max-w-full lg:flex">
                            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
                            </div>
                            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="flex items-center">
                                    <img className="w-32 h-32 mr-4" src={cart.link} alt="Avatar of Jonathan Reinink" />
                                    <div className="text-sm">
                                        <p className="text-gray-900 text-xl leading-none font-bold">{cart.title}</p>
                                        <p className="text-gray-600 text-lg pt-2">₹{cart.totalPrice}/-</p>
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-gray-900 text-xl leading-none font-bold pl-20">QUANTITY</p>
                                        <p className="text-gray-900 text-xl leading-none font-bold pl-32 pt-4">{cart.quantity}</p>
                                        {/* <p class="text-gray-600 text-lg pt-2">₹{cart.totalPrice}/-</p> */}
                                    </div>
                                </div>
                            </div>
                            <div className='py-20 px-5'>
                                <button className='btn btn-secondary p-2' onClick={()=>{navigate('/app/user/qr')}}>PROCEED TO PAYMENT</button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        </>
    )
}

export default Cart