import React, { useContext } from 'react'
import EcomContext from '../../context/EcomContext'
import { Navigate } from 'react-router-dom';

function Checkout() {
    const { cartItems, calculateTotalAmount, isAuthenticated }=useContext(EcomContext);

    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }

    const handlePayment = async (e) => {
        e.preventDefault();

        const amount = calculateTotalAmount().toFixed(2);
        const firstName = e.target.elements.firstName.value;
        const lastName = e.target.elements.lastName.value;
        const email = e.target.elements.email.value;
        const phone = e.target.elements.phone.value;
        const address = e.target.elements.address.value;
        const currency = e.target.elements.currency.value;

        try {
            const res = await fetch("http://localhost:8000/api/payment/initiate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    amount,
                    email,
                    currency,
                    address,
                    phone,
                })
            }) 
            const data = await res.json();
            if (res.ok) {
                window.location.href = data.link;
                console.log(data.link);
            } else {
                res.json("Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <div className="container max-w-6xl p-3 mx-auto my-24">
            <div className="grid grid-cols-3 md:grid-cols-2 shadow-xl">
                <div className="p-3 table">
                    <h1 className="text-start text-xl font-bold border-b pb-3">Order Summary</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Product Image</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems?.products?.map((items, index) => (
                                <tr key={index._id}>
                                    <td>{items.product?.name}</td>
                                    <td className='flex align-center justify-center'>
                                        <img src={items.product?.images[0]?.img} width="50px" alt="" />
                                    </td>
                                    <td>{items.quantity}</td>
                                    <td>${items.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="">Total: ${calculateTotalAmount()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <div className="cform">
                        <h1 className="text-end text-xl font-bold border-b pb-3">Delivery Details</h1>
                        <form onSubmit={(e) => handlePayment(e)}>
                            <div>
                                <label htmlFor="">First Name</label>
                                <input type="text" name='firstName' id='firstName' />
                            </div>
                            <div>
                                <label htmlFor="">Last Name</label>
                                <input type="text" name='lastName' id='lastName'/>
                            </div>
                            <div>
                                <label htmlFor="">Email Address</label>
                                <input type="email" name="email" id="email" />
                            </div>
                            <div>
                                <label htmlFor="">Phone Number</label>
                                <input type="text" name='phone' id='number' />
                            </div>
                            <div className="flex flex-wrap gap-2 border border-2 outline-0 p-3 rounded-xl">
                                <select name="currency" id="currency">
                                    <option value="NGN">NGN</option>
                                    <option value="USD">USD</option>
                                </select>
                                <h2 className="text-xl font-semibold" name="amount">{calculateTotalAmount().toFixed(2)}</h2>
                            </div>
                            <div>
                                <label htmlFor="">Address</label>
                                <input type="text" />
                                <input type="hidden" name="address" id='address' />
                            </div>
                            <div>
                                <button className='product-btn p-2 w-full text-[#fff] rounded bg-[#FBE042] captilize hover:bg-[teal]' type='submit'>Pay</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout;