import React from 'react'
import { Link } from 'react-router-dom'

function ProductItems({product_item_prop}) {
  return (
    <div>
        <div className="item h-[102vh] rounded card hover:scale-x-105 hover:scale-y-105 hover:duration-700">
            <img src={product_item_prop.images[0].img} alt="" />
            <div className="card-body bg-[silver] hover:bg-[gray] p-6">
                <h2 className="text-xl font-semibold uppercase py-1">{product_item_prop.year}</h2>
                <h2 className="text-2xl font-bold uppercase py-2">{product_item_prop.name}</h2>
                <p className="py-3">{product_item_prop.description}</p>
                <h5 className="text-2xl font-bold uppercase pt-2">${product_item_prop.price}</h5>
                <h5 className="text-sm pb-4">{product_item_prop.pricetxt}</h5>
                <Link to={`/explore/${product_item_prop._id}`} className='product-btn p-2 px-7 text-[#fff] rounded-full capitalize bg-[black] hover:bg-[#0BFCAE]'>explore</Link>
            </div>
        </div>
    </div>
  )
}

export default ProductItems;