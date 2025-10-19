import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import userContext from "../utils/userContext";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Header = () => {
    const cartIems = useSelector((state) => state.cart.items)

    const {loggedInUser} = useContext(userContext);

    const [btn, setBtn] = useState('Login');
    return (
        <div className="flex justify-between">
            {/* <div className="logo-container"> */}
                <img className="w-48" src={LOGO_URL} />
            {/* </div> */}
            <div>
                <ul className="flex gap-12 p-10 text-xl font-semibold">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to = "/cart">{cartIems.length || ""} Cart</Link></li>
                    <button className="login-btn" onClick={() =>setBtn(prev => prev == 'Login' ? 'Logout' : 'Login')}>{btn}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;