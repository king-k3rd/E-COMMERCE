import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import EcomContext from '../../context/EcomContext';

function SignUp() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("client");
    const { setItem } = useLocalStorage("auth-token");
    const [state, dispatch] = useContext(AuthContext);
    const { showHide, isAuthenticated } = useContext(EcomContext);
    const redirect = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/login" />
    }


    const registerHandler = async (e) => {
        e.preventDefault();
        console.log("submitted");
        
        try {
            const res = await fetch ("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    role,
                    password,
                    confirmPassword,
                })
            })

            const data = await res.json();
            if (data.message) {
                showHide("error", data.message)
            } else if (data === "User already exists!...") {
                showHide("error", "User already exists");
            } else if (data ==="Password do not match") {
                showHide("error", "Password's do not match");
            } else {
                dispatch({ type: "setToken", payload: data.token });
                setItem(data.token)
                redirect("/login");
                showHide("success", "You have successful registered");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <div className="signup flex justify-center">
            <div className="form h-[126vh] pt-10">
                <form onSubmit={registerHandler} action="" className='max-w- w-[32vw] h-[112vh] mx-auto rounded bg-[silver]'>
                    <h1 className='py-6 text-center text-4xl font-bold'>SIGN UP</h1>
                    <div className="">
                        <label htmlFor="" className='mx-7 font-semibold text-lg'>First Name:</label>
                        <input onChange={(e) => setFirstName(e.target.value)} type="text" className='p-2 mx-6 w-[28vw] m-2 rounded' placeholder='Input Username'/>
                    </div>
                    <div className="">
                        <label htmlFor="" className='mx-7 font-semibold text-lg'>Last Name:</label>
                        <input onChange={(e) => setLastName(e.target.value)} type="text" className='p-2 mx-6 w-[28vw] m-2 rounded' name="" id="" placeholder='Input Last Name'/>
                    </div>
                    <div className="">
                        <label htmlFor="" className='mx-7 font-semibold text-lg'>Phone Number:</label>
                        <input onChange={(e) => setPhone(e.target.value)} type="number" className='p-2 mx-6 w-[28vw] m-2 rounded' name="" id="" placeholder='Input Phone Number'/>
                    </div>
                    <div className="">
                        <label htmlFor="" className='mx-7 font-semibold text-lg'>E-Mail:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" className='p-2 mx-6 w-[28vw] m-2 rounded' name="" id="" placeholder='Input E-Mail'/>
                    </div>
                    <div className="">
                        <label htmlFor="" className='mx-7 font-semibold text-lg'>Password:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className='p-2 mx-6 w-[28vw] m-2 rounded' name="" id="" placeholder='Input Password'/>
                    </div>
                    <div className="">
                        <label htmlFor="" className='mx-7 font-semibold text-lg'>Confirm Password:</label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className='p-2 mx-6 w-[28vw] m-2 rounded' name="" id="" placeholder='Confirm Password'/>
                    </div>
                    <h1 className='text-center pb-6'>Already a member? <span className='font-bold'><a href="" className='hover:underline'>Log In</a></span></h1>
                    <div className="bg-[black] text-center text-lg text-white p-2 max-w-[10vw] rounded mx-auto my-3 hover:bg-[white] hover:text-[black]">
                        <button type="submit">SIGN UP</button>
                    </div>
                </form>
            </div>

            <div className="h-[90vh] pt-10">
                <div className="w-[32vw] h-[112vh] py-64 rounded bg-[grey]">
                    <div className="text-center text-black">
                        <h2 className='font-bold text-4xl py-3'>Welcome to Sign Up</h2>
                    </div>
                    <div className="text-center text-black">
                        <h3 className="text-lg">Already have an account?</h3>
                    </div>
                    <div className="text-center text-black my-6">
                        <Link to="/login" className='px-5 p-3 border-2 rounded-2xl hover:bg-[white] hover:text-[black]'>Login</Link>
                    </div>
                </div>
            </div>
        </div>    
    </>
  )
}

export default SignUp