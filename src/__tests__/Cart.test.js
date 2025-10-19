import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import Cart from '../components/Cart'
import Header from '../components/Header'
import { Provider } from "react-redux";
import appStore from '../utils/Redux/appStore'
import { BrowserRouter } from "react-router-dom";
import RestaurantMenu from "../components/RestaurantMenu";

describe("test Cart" , () => {
    it('should update cart', () => {
        render(
            <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
                <RestaurantMenu />
                <Cart />
            </Provider>
            </BrowserRouter>
        )

        expect(screen.getByText("Cart")).toBeInTheDocument();

        expect(screen.getByText("Recommended (20)")).toBeInTheDocument()

        const accordionbtn = screen.getByText("Recommended (20)")

        fireEvent.click(accordionbtn) //Close Accordion

        fireEvent.click(accordionbtn) //Expand Accordion

        const addbtns = screen.getAllByRole("button", {name : 'ADD'})

        fireEvent.click(addbtns[0]);

        expect(screen.getByText("1 Cart")).toBeInTheDocument()

        const clearbtn = screen.getByRole('button',{name : 'Clear Cart X'});

        fireEvent.click(clearbtn)

        expect(screen.getByText("Cart")).toBeInTheDocument()
    })
})