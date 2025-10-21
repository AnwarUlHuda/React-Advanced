import { useContext, useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import userContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";

const Header = () => {
    const cartIems = useSelector((state) => state.cart.items)

    const { loggedInUser } = useContext(userContext);
    const [active, setActive] = useState();
    const navItems = ['Home', 'About', 'Grocery', 'Contact', 'Cart'];

    useEffect(() => {
        setActive(window.location.pathname.split('/')[1] || 'Home')
    },[])
    const [btn, setBtn] = useState('Login');
    return (
        <div className="flex justify-between">
            {/* <div className="logo-container"> */}
            <img className="w-48" src={LOGO_URL} />
            {/* </div> */}
            <div>
                <ul className="flex gap-10 p-10 text-xl font-semibold">
                    {navItems.map((item) => (
                        <li key={item}>
                            <Link to={item == 'Home' ? '/' : item}
                                onClick={() => setActive(item)}
                                className={` text-gray-800 px-3 py-2 border-b-2 transition-all duration-300
                                    ${active === item
                                        ? 'border-blue-500 font-semibold'
                                        : 'border-transparent hover:border-blue-500 hover:bg-blue-50'}
                                        `}
                            >
                                {item == "Cart" ? (cartIems.length || "") + ' ' + item : item}
                            </Link>
                        </li>
                    ))}
                    <button className="login-btn cursor-pointer" onClick={() => setBtn(prev => prev == 'Login' ? 'Logout' : 'Login')}>{btn}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;
