import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import EventCreateForm from './pages/events/EventCreateForm';
import EventDetailPage from './pages/events/EventDetailPage';
import EventsPage from './pages/events/EventsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import EventEditForm from './pages/events/EventEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import ReviewsPage from './pages/reviews/ReviewsPage';
import NotFound from './components/NotFound';

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
            path="/myevents/going"
            render={() => (
              <EventsPage
                message="Oh no! Try adjusting the search keyword or click to show you're going to an event"
                filter={`going__owner__profile=${profile_id}&ordering=-going__created_at`}
              />
            )}
          />
          <Route
            exact
            path="/myevents/interested"
            render={() => (
              <EventsPage
                message="Oh no! Try adjusting the search keyword or click to show you're interested in an event"
                filter={`interested__owner__profile=${profile_id}&ordering=-interested__created_at`}
              />
            )}
          />
          <Route
            exact
            path="/reviews"
            render={() => (
              <ReviewsPage
                message="Oh no! Try adjusting the search keyword or add a review." 
                filter={`?ordering=-event_date`}
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
          <Route exact path="/events/:id" render={() => <EventDetailPage />} />
          <Route exact path="/events/:id/edit" render={() => <EventEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;