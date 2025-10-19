import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemList from './ItemList';
import { clearCart } from '../utils/Redux/slices/cartSlice';

const Cart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const total = cartItems.map((item) => (item.card.info.defaultPrice || item.card.info.price) / 100);
  const price = total.reduce((acc,red) => acc+red,0)
  return (
    <div className='flex flex-col w-1/2 justify-center m-auto items-center'>
      <button className='p-2 bg-black text-white rounded-full cursor-pointer' onClick={() => dispatch(clearCart())}>Clear Cart <span className='px-1.5 mx-1 text-red-700 font-bold bg-white rounded-2xl'> X</span></button>
      <ItemList cards={cartItems} cart />
      {cartItems.length> 0 && <div className="text-right font-semibold w-1/2 p-2 m-2">
        <h2>Total : { price}</h2>
      </div>}
    </div>
  )
}

export default Cart
