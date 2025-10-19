import React from 'react'
import { MENU_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addItem } from '../utils/Redux/slices/cartSlice';

const ItemList = ({ cards, cart=false }) => {

    const dispatch = useDispatch();

    const random = () => Math.floor(Math.random()*1675398).toString()

    const handleClick = (item) =>{
        if(!cart){
            let id = item.card.info.name+random()
            const updated = {...item,id}
        dispatch(addItem(updated));
        }
    }
    return (
        cards.map((item) => (
            <div className='mx-auto p-4 border-b last:border-0 w-25/26 flex gap-5' key={cart? item.id : item.card.info.id}>
                <div className='w-2/3 flex flex-col gap-1'>
                    <h4 className='text-sm'>{item.card.info.name} - ₹{(item.card.info.defaultPrice || item.card.info.price) / 100}</h4>
                    <h4 className='text-xs'>⭐{(item.card?.info?.ratings?.aggregatedRating?.rating || '--') + ` (${(item.card.info.ratings.aggregatedRating.ratingCountV2 || 0)})`}</h4>
                    <p className='text-xs italic'>{item.card.info.description}</p>
                </div>
                <div className="w-1/3 flex flex-col items-center relative">
                    <img className="rounded-2xl h-[90%] w-full" src={MENU_URL + (item.card.info.imageId)} alt="img" />
                    <button className='absolute bottom-1 cursor-pointer bg-orange-800 text-white p-1 px-5 rounded-2xl' onClick={() => handleClick(item)}>{cart ? `₹${(item.card.info.defaultPrice || item.card.info.price) / 100}` : "ADD"}</button>
                </div>
            </div>
        ))
    )
}

export default ItemList
