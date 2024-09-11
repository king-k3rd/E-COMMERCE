import React from 'react'

function About() {
  return (
    <div className='flex bg-[silver] h-[90vh]'>
        <div className="mx-20 my-24">
          <h3 className='uppercase font-bold text-4xl py-4'>About Us</h3>
          <div className="">
            <p>Our goal here at the <span className='font-bold'>JOE'S AUTOS</span> is to give you the best service <br /> you could ever imagine. Founded in 2008 the <span className='font-bold'>JOE'S AUTOS</span> has been <br /> consistence over the years bring cutomers the best they could possibly get on <br />here, we appreciate all those who have been sending in their reviews, it has <br /> helped us over these past years to know areas where we can work on so as <br /> to be able to satify users/customers.</p>
          </div>
          <div className="py-4">
            <button class="continue-application">
              <div>
                  <div class="pencil"></div>
                  <div class="folder">
                      <div class="top">
                          <svg viewBox="0 0 24 27">
                              <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                          </svg>
                      </div>
                      <div class="paper"></div>
                  </div>
              </div>
              Read More
            </button>
          </div>
          <div className="mx-4">
            <i className="fa-brands fa-facebook text-[red] text-2xl px-2"></i>
            <i className="fa-brands fa-twitter text-[red] text-2xl px-2"></i>
            <i className="fa-brands fa-instagram text-2xl text-[red] px-2"></i>
          </div>
        </div>
        <div className="img"></div>
    </div>
  )
}

export default About