import "@testing-library/jest-dom"
import MOCK_DATA from  './mocks/mockdata.json';
import { render , screen} from "@testing-library/react";
import CardComponent from "../utils/CardComponent";
import { OnlineCard } from "../components/Body";

describe("Body test" , () => {
    it('test with props',() =>{
        render(<CardComponent data={MOCK_DATA} />)

        const name = screen.getByText("KFC")

        const cards = screen.getAllByTestId('resCard')

        expect(name).toBeInTheDocument();

        expect(cards.length).toBe(1);
    })

    it("with Online label", () => {
        render(<OnlineCard data={MOCK_DATA}/>)

        const online = screen.getByText("🟢 OPEN")

        expect(online).toBeInTheDocument();
    })
})