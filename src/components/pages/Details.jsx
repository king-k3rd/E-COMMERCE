import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EcomContext from '../../context/EcomContext'
import ProductImages from '../ProductImages';

function Details() {
    const {product, addToCart} = useContext(EcomContext);
    const params = useParams();
    const showItems = params.id
    const productItems = product.find((items) => items._id === showItems)
    const [selectedImages, setSelectedImages] = useState(productItems?.images?.[0].img)

    useEffect(() => {
        setSelectedImages(productItems?.images?.[0].img)
    }, [productItems])

  return (
    <div>
        <div className="container max-w-3xl mx-auto">
            <h1 className="text-4xl my-9 uppercase font-bold text-center">{productItems?.name} Detail</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center">
                    <div>
                        <img src={selectedImages} alt=""/>
                        <ProductImages images={productItems?.images} setSelectedImages={setSelectedImages} />
                        {/* <img src={`http://localhost:3000/${productItems?.img}`} className='rounded' alt="" /> */}
                    </div>
                    <div>
                        <div className="card-body px-4">
                            <h2 className="text-2xl text-[black] bg-[silver] text-center font-bold uppercase py-3">{productItems?.name}</h2>
                            <div className="summary h-[155vh] w-[29vw] bg-[lightblue] my-4 rounded-xl">
                                <div className="vs">
                                    <h2 className="text-2xl p-3 font-bold uppercase">Vehicle Summary</h2>
                                </div>
                                <div className="info bg-[white] mx-4 p-3 rounded-xl">

                                    <h2 className="text-xl font-semibold uppercase pt-3">Price<span className='font-bold px-6'>${productItems?.price}</span></h2>
                                    <hr className='pb-2 border-[black] h-6' />
                                    
                                    <h2 className="text-xl font-semibold uppercase pt-3">Mileage<span className='font-bold px-6'>{productItems?.mileage}km</span></h2>
                                    <hr className='pb-2 border-[black] h-6' />

                                    <h2 className="text-xl font-semibold uppercase pt-3">Ext-Color<span className='font-bold px-6'>{productItems?.exteriorColor}</span></h2>
                                    <hr className='pb-2 border-[black] h-6' />

                                    <h2 className="text-xl font-semibold uppercase pt-3">Int-Color<span className='font-bold px-6'>{productItems?.interiorColor}</span></h2>
                                    <hr className='pb-2 border-[black] h-6' />

                                    <h2 className="text-xl font-semibold uppercase pt-3">Engine<span className='font-bold px-6'>{productItems?.engine}</span></h2>
                                    <hr className='pb-2 border-[black] h-6' />

                                    <h2 className="text-xl font-semibold uppercase pt-3">HorsePower<span className='font-bold px-6'>{productItems?.horsePower}hp</span></h2>
                                    <hr className='pb-2 border-[black] h-6' />

                                    <h2 className="text-xl font-semibold uppercase pt-3">EngineCapacity<span className='font-bold px-6'>{productItems?.engineCapacity}</span></h2>
                                    <hr className='pb-2 border-[black] h-6' />

                                    <h2 className="text-xl font-semibold uppercase pt-3">Seats<span className='font-bold px-6'></span>{productItems?.seats}</h2>
                                    <hr className='pb-2 border-[black] h-6' />

                                    <h2 className="text-xl font-semibold uppercase pt-3">Transmission<span className='font-bold px-6'>{productItems?.transmission}</span></h2>
                                    <hr className='pb-2 border-[black] h-6' />

                                    <h2 className="text-xl font-semibold uppercase pt-3">Vin<span className='font-bold px-6'>{productItems?.vin}</span></h2>
                                    <hr className='pb-2 border-[black] h-6'/>

                                    <h2 className="text-xl font-semibold uppercase pt-3">Stock#<span className='font-bold px-6'>{productItems?.stock}</span></h2>
                                    <hr className='pb-2 border-[black] h-6'/>

                                    <p className="pb-5">{productItems?.description}</p>

                                    <div data-tooltip={`Price:$${productItems?.price}`} class="button mt-8" onClick={() => addToCart(productItems._id, 1, productItems)} type="submit">
                                        <div class="button-wrapper">
                                            <div class="text">Add to Cart</div>
                                            <span class="icon">
                                                <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>    


                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Details