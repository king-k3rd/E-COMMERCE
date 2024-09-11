import React, { useContext } from 'react'
import ProductItems from './ProductItems'
import EcomContext from '../context/EcomContext'

function FeaturedProduct() {
  const {featuredProduct} = useContext(EcomContext)
  
  return (
    <div>
        <h1 className='text-4xl my-12 uppercase font-bold text-center'>Shop Used Car's</h1>
        <div className="container max-w-6xl mt-2 mb-24 m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-9">
                {featuredProduct.map((items, index) => (
                    <ProductItems key={index} product_item_prop={items}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default FeaturedProduct