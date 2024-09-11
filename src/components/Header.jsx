import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage';
import AuthContext from '../context/AuthContext';
import EcomContext from '../context/EcomContext';

function Header() {
    const [ open, setopen ] = useState(false);
    const { deleteItem } = useLocalStorage("auth-token");
    const [state, dispatch] = useContext(AuthContext);
    const redirect = useNavigate()
    const { showHide, isAuthenticated, cartItems } = useContext(EcomContext);

    const logout = (e) => {
        e.preventDefault()
        dispatch({ type: "setToken", payload:null })
        deleteItem("auth-token");
        redirect("/login");
        showHide("sucess", "Logged Out!")
    }

  return (
    <div className='bg-[teal] text-[#fff] sticky top-0 z-[20] flex justify-between items-center py-[15px] px-[30px]'>
        <div className="flex-1">
            {isAuthenticated ? (<>
                <Link to="/" className='flex'>
                    <i className="fa-solid fa-user px-2 pt-1"></i>
                    <h1 className='text-left text-[#fff] font-bold'>Hello, Josiah</h1>
                </Link>
            </>) : (<>
                <Link to="/">
                    <h1 className="text-left text-[#fff] font-bold">JOE AUTO'S</h1>
                </Link>
            </>)}
        </div>
        {/* {First Nav Bar} */}
        <nav className='hidden lg:flex space-x-4 text-white text-[16px]'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {isAuthenticated ? (<>
            <Link onClick={logout}>Log Out</Link>
            </>) : (<>
            <Link to="/login">Log In</Link>
            <Link to="/signup">SignUp</Link>
            </>)}

            <Link to="/cart" className='relative'>
                <i className="fa-solid fa-cart-shopping"></i>
                <div className='absolute bottom-4 left-4 text-white bg-blue-950 text-center rounded-full h-6 w-6 text-[15px]'>
                    {cartItems.products?.length}
                </div>
            </Link>
        </nav>
        <button type='button' className='flex justify-end lg:hidden items-center w-[35px] h-[35px]' 
            onClick={() => setopen(!open)}>
            <i className="fa-solid fa-bars"></i>
        </button>
        {/* Second nav Mobile */}
        {/* <div className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-[20] transition-opacity duration-200
            ${open }`}>

         </div> */}
        <div className={`fixed lg:hidden top-0 left-0 w-[300px] h-screen overflow-auto z-30 bg-[#A5B2C5] transition-transform duration-200 
            ${ open ? "translate-x-0" : "-translate-x-full"}`}>
            {/* XMark for closing */}
            <button className='absolute top-5 right-5 text-3xl text-black'
                onClick={() => setopen(!open)}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <nav onClick={() => setopen(open)} className='flex flex-col gap-5 text-center text-black pt-20 px-10 text-[25px]'>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                {isAuthenticated ? (<>
                    <Link onClick={logout}>Logout</Link>
                </>) : (<>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">SignUp</Link>
                </>)}
                    <Link to="/cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <div className='absolute bottom-4 left-4 text-white bg-blue-950 text-center rounded-full h-6  w-6 text-[15px]'>
                            {cartItems.products?.length}
                        </div>
                    </Link>
            </nav>
        </div>
    </div>
  )
}

export default Header