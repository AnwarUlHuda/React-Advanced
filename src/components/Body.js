import { useContext, useEffect, useState } from "react";
import CardComponent, { WithOnlineLabel } from "../utils/CardComponent";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { DASHBOARD } from "../utils/constants";
import UserContext from "../utils/UserContext";
import { Link } from "react-router-dom";

export const OnlineCard = WithOnlineLabel(CardComponent);

const Body = () => {

    const [resList, setResList] = useState([]);
    const [filteresResList, setFilteredList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [positions, setPositions] = useState();
    const [err, setErr] = useState('');

    useEffect(() => { getLocation() }, []);

    useEffect(() => {
        if (positions)
            fetchData();
    }, [positions])

    const getLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    const success = async (position) => {
        setPositions({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    const error = () => setPositions({ latitude: 18.4326892, longitude: 79.12960369999999 })

    const fetchData = async () => {
        setErr('');
        try {
            const data = await fetch(DASHBOARD + `lat=${positions.latitude}&lng=${positions.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
            const json = await data.json();
            console.log(json);
            try {
                const finalizedData = json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                const result = finalizedData.map((data) => data?.info);
                setResList(result);
                setFilteredList(result);
            }
            catch (err) {
                setErr('Location Unserviceable at this moment')
            }
        }
        catch (err) {
            setErr(err.message + ' data... Please enable CORS in your browser')
        }
    }
    const handleClick = () => {
        setFilteredList(filteresResList.filter((res) => res.avgRating > 4.3));
    }
    const handleSearch = () => {
        setFilteredList(resList.filter((res) => res.name.toLowerCase().includes(searchText.toLowerCase())))
    }

    if (err) {
        return <div className="flex text-red-500 font-semibold justify-center">{err}</div>
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
                <button className="border-2 border-red-800 rounded p-1 px-4 bg-red-600 text-white cursor-pointer" onClick={() => {
                    setFilteredList(resList)
                    setSearchText('')
                }}>Clear</button>
            </div>
            <div className="absolute top-0 right-10 text-md">Total Restaurants : <span className="text-blue-800 font-bold">{filteresResList.length}</span></div>
            <div className="flex flex-wrap gap-15 justify-center">
                {filteresResList.map((data) =>
                (<Link
                    key={data.id}
                    to={data.name + "/" + data.id}
                >
                    {data.isOpen == true ? <OnlineCard data={data} /> : <CardComponent data={data} />}
                </Link>))}
            </div>
        </div>
    )
}

export default Body;
