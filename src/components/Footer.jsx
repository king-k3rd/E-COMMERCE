import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <div className="w-full bg-[#000] text-[#FBE042] p-3">
            <div className="container p-3">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div>
                        <h2 className='text-2xl font-black uppercase'>JOE'S Autos</h2>
                        <p className='text-[white]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores sapiente natus, itaque minus placeat, officiis aliquid totam atque quod est exercitationem. Assumenda, asperiores? Illo et dolorem tenetur sequi dicta assumenda.</p>
                    </div>  
                    <div className=''>
                        <h2 className="text-2xl font-black uppercase">Useful Links</h2>
                        <div>
                            <ul className='text-[white]'>
                                <li><Link to="">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/product">Product</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="">
                        <h2 className="text-2xl font-black uppercase">Socials</h2>
                        <ul className="socials text-[white] flex py-2">
                            <li><Link to=""><i className="fa-brands fa-whatsapp text-2xl px-2 hover:text-[#FBE042]"></i></Link></li>
                            <li><Link to=""><i className="fa-brands fa-twitter text-2xl px-2 hover:text-[#FBE042]"></i></Link></li>
                            <li><Link to=""><i className="fa-brands fa-instagram text-2xl px-2 hover:text-[#FBE042]"></i></Link></li>
                            <li><Link to=""><i className="fa-brands fa-facebook text-2xl px-2 hover:text-[#FBE042]"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-start pt-3 pb-3">
                2024 &copy; JOE'S Autos | All right reserved
            </div>
        </div>
    </div>
  )
}

export default Footer