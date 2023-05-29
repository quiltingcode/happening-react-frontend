import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import NotFound from "../NotFound"

test('Go Back to homepage link renders', () => {
        render(
            <Router>
                <NotFound />
            </Router>
        );
            
        const goBack = screen.getByRole('link', { name: 'Oooops! Click here to return to the Homepage'})
        expect(goBack).toBeInTheDocument()
    })
