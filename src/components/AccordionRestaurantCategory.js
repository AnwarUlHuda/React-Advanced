import React, { useState } from 'react'
import ItemList from './ItemList'

const AccordionRestaurantCategory = ({ data, showItems, handleClick }) => {
    return (
        <div className='w-full shadow-gray-700 shadow-lg p-2 last:mb-10 rounded my-1 bg-gray-50 mx-4'>
            <div className='flex justify-between cursor-pointer' onClick={handleClick}>
                <div className='font-semibold'>{data?.title} ({data.itemCards.length})</div>
                <div>{showItems ? "⬆️" : "⬇️"}</div>
            </div>
            {showItems && <ItemList cards={data.itemCards} />}
        </div>
    )
}

export default AccordionRestaurantCategory
