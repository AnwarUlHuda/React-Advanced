import { act, fireEvent, render, screen } from "@testing-library/react"
import Body from "../components/Body"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import mockBodyData from './mocks/mockBody.json'


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(mockBodyData);
        }
    })
})

describe("search", () => {

    it("searchbutton functionality", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Body />
                </BrowserRouter>
            )
        })

        const resCardBeforeSearch = screen.getAllByTestId('resCard');

        expect(resCardBeforeSearch.length).toBe(20);

        const search = screen.getByRole('button', { name: "Search" })

        const searchInput = screen.getByTestId('searchInput');

        fireEvent.change(searchInput, { target: { value: "pizza" } });

        fireEvent.click(search);

        const resCard = screen.getAllByTestId('resCard');

        expect(resCard.length).toBe(2)

        // expect(search).toBeInTheDocument();
    })

    it("Should filter top rated restaurat", async () => {
        await act(async () => {
            render(<BrowserRouter>
                <Body />
            </BrowserRouter>)
        })

        const cardsbeforeClick = screen.getAllByTestId('resCard')

        expect(cardsbeforeClick.length).toBe(20)

        const topratedButton = screen.getByRole("button", { name: "Top Rated Restaurants" })

        fireEvent.click(topratedButton)

        const cardsAfterClick = screen.getAllByTestId('resCard')

        expect(cardsAfterClick.length).toBe(2)

        const clearbtn = screen.getByRole('button', {name: "Clear"});

        fireEvent.click(clearbtn)

        expect(screen.getAllByTestId('resCard').length).toBe(20)
    })
})