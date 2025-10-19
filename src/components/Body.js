import { useContext, useEffect, useState } from "react";
import CardComponent, { WithOnlineLabel } from "../utils/CardComponent";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { DASHBOARD } from "../utils/constants";
import UserContext from "../utils/userContext";
import { Link } from "react-router-dom";

export const OnlineCard = WithOnlineLabel(CardComponent);

const Body = () => {

    const [resList, setResList] = useState([]);
    const [filteresResList, setFilteredList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const isOnline = useOnlineStatus();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch(DASHBOARD);
        const json = await data.json();
        console.log(json);
        const finalizedData = json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        const result = finalizedData.map((data) => data?.info);
        setResList(result);
        setFilteredList(result);
    }
    const handleClick = () => {
        setFilteredList(resList.filter((res) => res.avgRating > 4.3));
    }
    const handleSearch = () => {
        setFilteredList(resList.filter((res) => res.name.toLowerCase().includes(searchText.toLowerCase())))
    }

    if (!isOnline) {
        return <div>Looks like you are offline !, Please check your internet connection</div>
    }

    // const { loggedInUser, setUserName } = useContext(UserContext);

    return resList.length == 0 ? <Shimmer /> : (
        <div className="relative flex flex-col gap-10 items-center justify-center pb-10">
            <div className="flex gap-10 items-center justify-center pb-8 border-b-1">
                <input className="border-2 rounded px-1 h-8" data-testid="searchInput" type="text" placeholder="King's Palace Restaurant" value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                <button className="border-2 border-green-700 rounded p-1 px-4 bg-green-600 text-white cursor-pointer" onClick={handleSearch}>Search</button>
                <div className="filter">
                    <button className="border-2 rounded p-1 px-4 bg-teal-600 text-white cursor-pointer" onClick={handleClick}>Top Rated Restaurants</button>
                </div>
                <button className="border-2 border-red-800 rounded p-1 px-4 bg-red-600 text-white cursor-pointer" onClick={() => setFilteredList(resList)}>Clear</button>
            </div>
            <div className="absolute top-0 right-10 text-md">Total Restaurants : <span className="text-blue-800 font-bold">{filteresResList.length}</span></div>
            <div className="flex flex-wrap gap-15 justify-center">
                {filteresResList.map((data) =>
                (<Link
                    key={data.id}
                    to={data.name +"/" + data.id}
                >
                    {data.isOpen == true ? <OnlineCard data={data} /> : <CardComponent data={data} />}
                </Link>))}
            </div>
        </div>
    )
}

export default Body;
