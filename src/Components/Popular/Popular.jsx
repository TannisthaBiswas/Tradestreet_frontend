import React from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = (props) => {
  return (
    <div className='popular'>
      <hr/>
      <h1>POPULAR NOW</h1>
      <hr />
      <div className="popular-item">
        {props.data.map((item,index)=>{
            return <Item id={item.id} key={index} name={item.name} 
            image={item.images.length > 0 ? item.images[0].url : "https://res.cloudinary.com/doxlmnhct/image/upload/v1739809269/product_images/1739809267195-pink_shirt_2.webp.jpg"}  
           
            new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
