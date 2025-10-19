import React, { useEffect, useState } from 'react'

const useRestaurantMenu = (resId) => {

  const [resInfo, setResInfo] = useState(null);
   useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
      try{
        const fetchedData = await fetch('https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.4326892&lng=79.12960369999999&restaurantId=146097&catalog_qa=undefined&submitAction=ENTER')
        const dataupdated = await fetchedData.json();
        const result = dataupdated.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        const allcategories = result.filter((item) => item.card.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" )
        setResInfo(allcategories);
      }
      catch(err){
        console.error(err);
      }
    }
  return resInfo;
}

export default useRestaurantMenu;