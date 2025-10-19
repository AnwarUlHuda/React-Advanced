import { SWIGGY_URL } from "./constants.js";

const CardComponent = (props) => {
    const data = props.data;
    const { name, avgRating, cloudinaryImageId, cuisines, locality, costForTwo, id } = data;
    return (
        <div data-testid="resCard" className="w-60 h-68 hover:bg-gray-400 cursor-pointer flex flex-col gap-1 content-center p-2 rounded-2xl">
            <img className="shadow-cyan-500 shadow-md rounded-xl h-[50%]" src={`${SWIGGY_URL}${cloudinaryImageId}`} />
            <h3 className="font-semibold text-lg text-violet-700 pl-1">{name.length >22 ? name.slice(0,22) + "..." : name}</h3>
            <h4>⭐{avgRating} • <span>{data?.sla?.slaString}</span></h4>
            <p className="px-2 text-sm font-semibold">{costForTwo}</p>
            <p className="px-2 text-sm italic">{(cuisines.length >= 3) ? (cuisines.join(', ').slice(0, 25) + "...") : cuisines.join(', ')}</p>
            <p className="px-2 text-xs italic">{locality}</p>

        </div>
    )
}

export const WithOnlineLabel = (CardComponent) => {
    return (props) => {
        return (
        <div>
            <label className="absolute text-xs m-3 pr-2 bg-black text-white rounded-4xl border-0">🟢 OPEN</label>
            <CardComponent {...props}/>
        </div>
    )}
}

export default CardComponent;