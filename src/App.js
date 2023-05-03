import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import EventCreateForm from './pages/events/EventCreateForm';
import EventPage from './pages/events/EventPage';
import EventsPage from './pages/events/EventsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <EventsPage message="Oh no! Try adjusting the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <EventsPage
                message="Oh no! Try adjusting the search keyword or follow someone."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/myevents"
            render={() => (
              <EventsPage
                message="Oh no! Try adjusting the search keyword or click to show you're interested or going to an event"
                filter={`interested__owner__profile=${profile_id}&going__owner__profile=${profile_id}&ordering=-interested__created_at&ordering=-going__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/reviews"
            render={() => (
              <EventsPage 
                message="Oh no! Try adjusting the search keyword or add a review." 
                filter={`&ordering=-event_date`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/events/create"
            render={() => <EventCreateForm />}
          />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;