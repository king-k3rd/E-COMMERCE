import React from 'react'
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div>
        <div className="steph z-0 overflow-hidden ">
            <div className="">
              <video src="/img/LND_MY24_WelcomeMat_TCOM_NA-New_ENG_10_TDRMLPHeroDeskTab1920x796fs5mb_TYTW2579000H_UbpW1JohyROrHCpfkbp.mp4" autoPlay muted loop></video>
            </div>
                <div className="steph-container font-bold text-4xl uppercase text-[#FBE042]">
                    <h2>Welcome to JOE'S Autos</h2>
                    <h2>Where Elegance meets Luxury</h2>
                    <div className="text-2xl font-semibold py-4">
                      <Link to="/product" className='text-[#FBE042] p-2 rounded-full border-solid border-white border-2 hover:p-3 hover:bg-[#FBE042] hover:text-[black] hover:font-bold hover:border-[black] '>See Products</Link>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Banner