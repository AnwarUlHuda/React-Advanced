import React, { lazy, Suspense, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
import Shimmer from "./src/components/Shimmer";
import UserContext from "./src/utils/userContext";
import { Provider } from "react-redux";
import appStore from "./src/utils/Redux/appStore";
import Cart from "./src/components/Cart";

const Grocery = lazy(() => import("./src/components/Grocery"));


const AppLayout = () => {
    const [userName, setUserName] = useState('')
    return (
        <Provider store={appStore}>
            {/* <UserContext value={{ loggedInUser: userName, setUserName }}> */}
                <div className="app bg-amber-300 min-h-[100vh]" >
                    <Header />
                    <Outlet />
                </div>
            {/* </UserContext> */}
        </Provider>)
}

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/grocery',
                element: <Suspense fallback={<Shimmer />} ><Grocery /></Suspense>,
            },
            {
                path: '/:restaurant/:id',
                element: <RestaurantMenu />
            },
            {
                path: '/cart',
                element : <Cart/>
            }
        ],
        errorElement: <Error />
    },
])

const div = <div id="root">nested</div>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);