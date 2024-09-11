import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import EcomContext from '../../context/EcomContext'

function Cart() {
   const {cartItems, calculateSubtotal, calculateVat, calculateTotalAmount, removeCartItems, updateCartItems } = useContext(EcomContext);
  return (
    <div>
        <div className="container max-w-5xl mx-auto my-24 bg-[whitesmoke]">
            <div className="grid grid-cols-1">
                <div className="p-3 table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Product Image</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Quantity</th>
                                <th>Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems?.products?.map((items, index) => (
                                <tr key={index.product_id}>
                                    <td>{items.product?.name}</td>
                                    <td className='flex align-center justify-center'><img src={items.product?.images[0]?.img} width="70px" alt="" /></td>
                                    <td>${items.product?.price}</td>
                                    <td>${items.amount}</td>
                                    <td>
                                        <form action="">
                                            <input type="number" onChange={(e) => updateCartItems(items.product._id, e.target.value)} min={1} value={items.quantity} name="" id="" />
                                        </form>
                                    </td>
                                    <td>
                                        <button type="submit" onClick={() => removeCartItems(items.product._id)}><i className="fa-solid fa-xmark"></i></button>
                                    </td>
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
                                <td className=''>Subtotal: $ {calculateSubtotal()}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className=''>VAT (7.5%): ${calculateVat()}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className=''>Total: ${calculateTotalAmount()}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className=''><Link to="/checkout" className='product-btn p-2 text-[#fff] rounded bg-[#cda124] hover:bg-[teal]'>Checkout</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart