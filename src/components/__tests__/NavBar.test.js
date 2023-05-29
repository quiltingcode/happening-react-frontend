import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import NavBar from '../NavBar'
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test('renders NavBar Home Link', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );
    // screen.debug();
    const homeLink = screen.getByRole("link", { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
});

test('renders link to the feed page for a logged in user', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );
    
    const feed = await screen.findByText('Feed');
    expect(feed).toBeInTheDocument()
});

test('renders link to the reviews page for a logged in user', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );
    
    const reviews = await screen.findByText('Reviews');
    expect(reviews).toBeInTheDocument()
});

