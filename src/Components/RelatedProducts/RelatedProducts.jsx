import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { backend_url } from '../../App';

const RelatedProducts = ({category,id}) => {

  const [related,setRelated] = useState([]);

  useEffect(()=>{
    fetch(`${backend_url}/relatedproducts`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({category:category}),
      })
    .then((res)=>res.json()).then((data)=>setRelated(data))
  },[])

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item,index)=>{
          if (id !== item.id) {
            return <Item key={index} id={item.id} name={item.name} 
           image={item.images.length > 0 ? item.images[0].url : "https://res.cloudinary.com/doxlmnhct/image/upload/v1739809269/product_images/1739809267195-pink_shirt_2.webp.jpg"}  
           
            new_price={item.new_price} old_price={item.old_price}/>
          }
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
