import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage';
import AuthContext from '../../context/AuthContext';
import EcomContext from '../../context/EcomContext';


function Login() {
    const [message, setMessage] = useState("");
    const [btnDisabled, setBtnDisabled] = useState("");
    const [email, setEmail] = useState("");;
    const [password, setPassword] = useState("");
    const { showHide, isAuthenticated,setCartItems, fetchCart } = useContext(EcomContext);
    const { setItem, getItem, deleteItem } = useLocalStorage("auth-token");
    const [state, dispatch] = useContext(AuthContext);
    const redirect = useNavigate();

    
    const validatePassword = (e) => {
        if (password === "") {
            setBtnDisabled(true);
            setMessage("Enter your password");
        } else if (password !== "" && password.trim().length < 8) {
            setBtnDisabled(true);
            setMessage("Your Password must be atleast 8 characters");
        }else{
            setBtnDisabled(false);
            setMessage("Valid Password")
        }
        setPassword(e.target.value)
        e.preventDefault();
    }

    if (isAuthenticated) {
        return <Navigate to="/" />
    }


    
  
  // client02@gmail.com
  // qwerty456
  
    if (isAuthenticated) {
      return <Navigate to="/" />
    }
    
    const loginHandler = async (e) => {
      e.preventDefault();
      if (!email || !password) {
        showHide("error", "Email and Passowrd is required")
        return;
      } 
      try {
        const res = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.message) {
          showHide("error", data.message);
        }else {
          dispatch({ type: "setToken", payload: data.token });
          setItem(data.token);
          const cartDataItem = JSON.parse(getItem("cart"));
          if (cartDataItem) {
            console.log("request made");
            await Promise.all(cartDataItem?.products?.map(async (item) => {
              const response = await fetch("http://localhost:8000/api/add-to-cart", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": getItem("auth-token"),  // Use the token directly
                },
                body: JSON.stringify({ productId: item.product._id, quantity: item.quantity }),
              });
  
              const cartdata = await response.json();
              // console.log( "todday", cartdata);
              if (res.ok) {
                setCartItems(cartdata && cartdata.products);
                fetchCart();
                showHide("success", "added to cart successfully")
              } else {
                console.error("Failed to add items to the backend cart");
              }
            }));
            deleteItem("cart");
          }
  
          redirect("/");
          showHide("success", "you are now logged in");
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
        <div className="flex align-center justify-center">
            <div className="form h-[90vh] pt-10">
                <form onSubmit={loginHandler} action="" className='max-w-[32vw] h-[75vh] mx-auto rounded bg-[grey]'>
                    <h1 className='py-8 text-4xl text-center font-bold'>LOGIN</h1>
                    <div className="py-4 px-4">
                        <label htmlFor="" className='font-bold text-xl px-3'>E-Mail:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type='email' className='p-2 w-[28vw] m-2 rounded' placeholder='Input E-mail'/>
                    </div>
                    <div className="py-4 px-4">
                        <label htmlFor="" className='font-bold text-xl px-3'>Password:</label>
                        <input onChangeCapture={(e) => setPassword(e.target)} onChange={validatePassword} type="password" className='p-2 w-[28vw] m-2 rounded' name="" id="" placeholder='Input Password'/>
                            {message && <p> {message} </p>}
                    </div>
                    <div className='max-w-[28.5vw] mx-auto '>
                        <button className='bg-[#1B1811] rounded text-lg text-center text-white p-2 py-3 w-[28vw] hover:bg-[white] hover:text-[black]' type="submit" disabled={btnDisabled}>Log In</button>
                    </div>
                </form>
            </div>

            <div className="h-[90vh] pt-10">
                <div className="w-[32vw] h-[75vh] py-40 rounded bg-[#1B1811]">
                    <div className="text-center text-white">
                        <h2 className='font-bold text-4xl py-3'>Welcome to login</h2>
                    </div>
                    <div className="text-center text-white">
                        <h3 className="text-lg">Don't have an account?</h3>
                    </div>
                    <div className="text-center my-6 text-white">
                        <Link to="/signup" className='p-3 border-2 rounded-2xl hover:bg-[white] hover:text-[black]'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>    
    </>
  )
}

export default Login