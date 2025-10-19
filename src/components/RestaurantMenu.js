import React, { useState } from 'react'
import { Link, useParams } from 'react-router'
import AccordionRestaurantCategory from './AccordionRestaurantCategory';
import { restData } from '../utils/constants';

const RestaurantMenu = () => {
    const { restaurant, id } = useParams();
    const [showIndex, setShowIndex] = useState(0);

    const resInfo = restData.filter((item) => item.card.card['@type'] = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")
    // const categories = useRestaurantMenu(id);

    const clicked = (index) => {
        if (index == showIndex) {
            setShowIndex(null)
        }
        else {
            setShowIndex(index);
        }
    }
    return (
        <div className='flex relative flex-col items-center justify-center'>
            <Link className='absolute left-0 top-0' to='/'>{"🔙 back to Previous"}</Link>
            <h1 className='font-bold my-4 text-2xl'>{restaurant}</h1>
            <div className='w-1/2 flex flex-col justify-center items-center'>
                {
                    resInfo.map((item, index) => <AccordionRestaurantCategory showItems={showIndex == index} handleClick={() => clicked(index)} data={item.card.card} key={item.card.card.categoryId} />)
                }
            </div>
        </div>
    )
}

export default RestaurantMenu
