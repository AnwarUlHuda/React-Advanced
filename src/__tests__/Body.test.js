import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react"
import Body from "../components/Body"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import mockBodyData from './mocks/mockTestBody.json'
import useOnlineStatus from "../utils/useOnlineStatus"


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(mockBodyData);
        }
    })
})


describe("body", () => {

    it("check online", async () => {

        const { result } = renderHook(() => useOnlineStatus())

        expect(result.current).toBe(true)

        await act(async () => {
            window.dispatchEvent(new Event('offline'));
        });

        expect(result.current).toBe(false)

                await act(async () => {
            window.dispatchEvent(new Event('online'));
        });

        expect(result.current).toBe(true)
    });


    it('should show offline message when the user is offline', async () => {
        // Mock the hook to initially return true (online)
        const { result } = renderHook(() => useOnlineStatus());

        await act(async () => {
            render(
                <BrowserRouter>
                    <Body />
                </BrowserRouter>
            );
        });

        // Ensure it's online initially
        expect(result.current).toBe(true);

        // Trigger the offline event
        await act(async () => {
            window.dispatchEvent(new Event('offline'));
        });

        // Check if the offline message is shown
        expect(screen.getByText("Looks like you are offline !, Please check your internet connection")).toBeInTheDocument();
    });

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
})