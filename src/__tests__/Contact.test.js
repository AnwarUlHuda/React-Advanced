import { render, screen } from "@testing-library/react";
import Contact from "../components/Contact";
import "@testing-library/jest-dom"


describe("Contact Page test cases", () => {

    test('test', () => {
        render(<Contact />);

        const heading = screen.getByRole("heading");

        expect(heading).toBeInTheDocument();
    })

    test("another", () => {
        render(<Contact />)

        const button = screen.getByRole("button")

        expect(button).toBeInTheDocument();
    })

    test("another1", () => {
        render(<Contact />)

        const button = screen.getByText('Submit')

        expect(button).toBeInTheDocument();
    })

    test('text', () => {
        render(<Contact />)

        const text = screen.getByPlaceholderText('name')
        expect(text).toBeInTheDocument();
    })

    test("inputs", () => {
        render(<Contact />)

        const textInputs = screen.getAllByRole('textbox')
        expect(textInputs.length).toBe(2)
    })

    it("inputs", () => {
        render(<Contact />)

        const textInputs = screen.getAllByRole('textbox')
        expect(textInputs.length).not.toBe(3)
    })

});