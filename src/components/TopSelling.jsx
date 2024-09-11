import React, { useContext } from 'react'
import ProductItems from './ProductItems'
import EcomContext from '../context/EcomContext'

function TopSelling() {
  const {topSellingProduct} = useContext(EcomContext)
  
  return (
    <div>
        <h1 className='text-4xl my-12 uppercase font-bold text-center'>Shop New Car's</h1>
        <div className="container max-w-6xl mt-2 m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-9">
                {topSellingProduct.map((items, index) => (
                    <ProductItems key={index} product_item_prop={items}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default TopSelling