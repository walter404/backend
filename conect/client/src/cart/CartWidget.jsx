import React from 'react'
import {Link} from 'react-router-dom'
import img from '../img/cart.png'
import './cart'

function Cart() {
  return (
    <>
      <Link to='/cart'>
        <div className='cart-widget'>
         <img src="{img}" alt="cart" />
        </div>
      </Link>
    </>
  )
}

export default Cart
