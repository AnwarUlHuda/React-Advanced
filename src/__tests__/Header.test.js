import { fireEvent, render, screen } from "@testing-library/react"
import Header from '../components/Header'
import { Provider } from "react-redux"
import appStore from '../utils/Redux/appStore'
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"

describe("Header page", () => {

    it("Should load with a login button", () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        )

        const loginButton = screen.getByRole('button', { name: "Login" });

        expect(loginButton).toBeInTheDocument();

    })

    it("Should load with Cart", () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        )

        const cartItem = screen.getByText("Cart")
        // const cartItem = screen.getByText(/Cart/) using regex expression

        expect(cartItem).toBeInTheDocument();
    })

    it("Should change login button to logout onclick", () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        )

        const loginButton = screen.getByRole('button', { name: "Login" });

        expect(loginButton).toBeInTheDocument();
        
        fireEvent.click(loginButton);

        const logoutButton = screen.getByRole('button', { name: "Logout" });

        expect(logoutButton).toBeInTheDocument();

        fireEvent.click(logoutButton)

        expect(loginButton).toBeInTheDocument();

    })

})