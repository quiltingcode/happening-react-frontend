# **Happening**

# Frontend Testing

## Table of Contents

* [**Testing**](<#testing>)
    * [Code Validation](<#code-validation>)
    * [Automatic Testing](<#automatic-testing>)
    * [Manual Testing](<#manual-testing>)
    * [Known Bugs](<#known-bugs>)

## Code Validation 

The Happening site has been passed through the [W3C html Validator](https://validator.w3.org/), the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) and the [ESLint Validator](https://eslint.org/docs/latest/use/getting-started#next-steps).

### W3C HTML Validation Results

No errors were found when the deployed Happening URL was passed through W3C HTML validation checker. Only some lines of info were noted regarding the standard Meta code in the index.html file. 

![W3C HTML Validation](images/html-no-errors.jpg)

### W3C CSS Validation Results

No errors or warnings were found when the deployed Happening URL was passed through the W3C CSS Validation checker.

![W3C CSS Validation](images/css-no-errors.jpg)

### ESLint Validation Results

After resolving the errors caused where files, by default, had react imported but not used, only 9 errors regarding the testing files, so I have left these, and subsequently uninstalled ES Lint as it was causing conflicts with the dependency tree. 

![ES Lint](images/eslint-results.png)


## Automatic Testing

The following Jest automatic tests have been written to check that the main frontend components render correctly: 

### NavBar.js
|  | | |
|:-------:|:--------|:--------|
| Renders Navbar Home link| &check; |
| Renders link to the feed page for a logged in user | &check; |
| Renders link to the reviews page for a logged in user | &check; |

### NotFound.js
|  | | |
|:-------:|:--------|:--------|
| Go Back to homepage link renders | &check; |

### Avatar.js
|  | | |
|:-------:|:--------|:--------|
| Avatar renders | &check; |

### Event.js
|  | | |
|:-------:|:--------|:--------|
| Renders event component | &check; |
| Event owner avatar renders | &check; |

## Manual Testing

As well as the automatic tests, I carried out the following additional manual tests to check all the user story scenarios:

| Status | **Authentication - User Logged Out**
|:-------:|:--------|
| &check; | Typing 'https://happening-react.herokuapp.com/feed' url into the browser, the user can not access the feed page. User is redirected Home
| &check; | Typing 'https://happening-react.herokuapp.com/myevents/going' url into the browser, the user views the homepage events feed
| &check; | Typing 'https://happening-react.herokuapp.com/myevents/interested' url into the browser, the user views the homepage events feed
| &check; | Typing 'https://happening-react.herokuapp.com/reviews' url into the browser, the user is redirected back to the homepage
| &check; | Typing 'https://happening-react.herokuapp.com/events/create' url into the browser, the user is redirected back to the homepage
| &check; | Typing 'https://happening-react.herokuapp.com/profiles/{id}/edit' url into the browser, the user is redirected back to the homepage
| &check; | Typing 'https://happening-react.herokuapp.com/events/{id}/edit' url into the browser, the user is redirected back to the homepage
| &check; | Desktop and tablet users can see an image next to the sign in form
| &check; | Mobile users can't see an image next to the sign in form
| &check; | Desktop and tablet users can see an image next to the sign up form
| &check; | Mobile users can't see an image next to the sign up form

| Status | **Navigation - User Logged Out**
|:-------:|:--------|
| &check; | Clicking the navbar brand logo loads the home page
| &check; | Clicking the Home button on the nav bar re-loads the home page
| &check; | Clicking the Sign In button on the nav bar loads the sign up page
| &check; | Clicking the Sign Up button on the nav bar loads the sign in page
| &check; | The user can not see the profile page link in the navigation bar profile section dropdown menu
| &check; | The user can not see the sign out link in the navigation bar profile section dropdown menu
| &check; | Users can not see the Feed menu option in the navigation bar
| &check; | Users can not see the My Events menu option in the navigation bar
| &check; | Users can not see the Reviews menu option in the navigation bar
| &check; | Users can not see the 'Add Event' button in the navigation bar
| &check; | Tablet and mobile users can see the navigation bar options in a burger menu dropdown
| &check; | Clicking a link from the navigation bar links automatically closes the burger menu
| &check; | User can not sign in with false credentials - warning message displayed
| &check; | User can not sign in without filling out all the input fields - warning message displayed
| &check; | User can not sign up without filling out all the input fields - warning message displayed
| &check; | User can not sign up if the two password fields don't match - warning message displayed
| &check; | User can not sign up if the username chosen already exists in the database - warning message displayed

| Status | **Homepage - User Logged Out**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Users can not view the follow button under each Popular Profile
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Desktop and tablet users can view the Top Events component on the right
| &check; | Mobile users can view the Top Events component under the Popular Profiles component.
| &check; | Clicking on a top event title, users are redirected to the selected event detail page
| &check; | Users can view all events - title, description, event date, image and tags
| &check; | Users can view the interested count
| &check; | Users can view the going count
| &check; | Users can view the comments count
| &check; | Clicking on an event image, users are redirected to the selected event detail page
| &check; | Clicking on an event comments count, users are redirected to the selected event detail page
| &check; | Clicking on an event owner avatar, users are redirected to the selected profile page
| &check; | Users can search for a particular event by typing in the event title, the username of the event owner, the event date, or the event tag
| &check; | Users can filter the list of events by selecting a category from the category dropdown


| Status | **Event Detail Page - User Logged Out**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Desktop and tablet users can view the Top Events component on the right
| &check; | Mobile users can view the Top Events component under the Popular Profiles component.
| &check; | Clicking on a top event title, users are redirected to the selected event detail page
| &check; | Users can view details of a single event
| &check; | Clicking on an event owner avatar, users are redirected to the selected profile page
| &check; | Clicking on the interested button, users are advised to logout to register their interest in the event
| &check; | Clicking on the going button, users are advised to logout to show they are going to the event
| &check; | Users can view any published comments posted about this event
| &check; | Users can not see the create comment form

| Status | **Profile Page - User Logged Out**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Desktop and tablet users can view the Top Events component on the right
| &check; | Users can view the number of events the profile owner has posted
| &check; | Users can view the number of events the profile owner has attended
| &check; | Users can view the number of followers the selected profile has
| &check; | Users can view the number of other profiles the selected profile is following
| &check; | Users can view the events which were posted by the selected profile
| &check; | Clicking on the event image, users are redirected to the selected event detail page
| &check; | Clicking on the interested button, users are advised to logout to register their interest in the event
| &check; | Clicking on the going button, users are advised to logout to show they are going to the event
| &check; | Clicking on an event comments count, users are redirected to the selected event detail page
| &check; | Clicking on a url in the contact details section will open the web page in a new browser tab.

| Status | **Navigation - User Logged In**
|:-------:|:--------|
| &check; | Clicking the navbar brand logo loads the home page
| &check; | Clicking the Home button on the nav bar re-loads the home page
| &check; | User can't see the sign in button in the navigation bar profile section dropdown menu
| &check; | User can't see the sign up button in the navigation bar profile section dropdown menu
| &check; | The user can see the profile page link in the navigation bar profile section dropdown menu
| &check; | The user can see the sign out link in the navigation bar profile section dropdown menu
| &check; | Users can see the Feed menu option in the navigation bar
| &check; | Users can see the My Events menu dropdown in the navigation bar
| &check; | Users can see the Reviews menu option in the navigation bar
| &check; | Users can see the 'Add Event' button in the navigation bar
| &check; | Tablet and mobile users can see the navigation bar options in a burger menu dropdown
| &check; | Clicking a link from the navigation bar links automatically closes the burger menu
| &check; | User can view their avatar image next to the profile page link

| Status | **Homepage - User Logged In**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Users can view the follow button under each Popular Profile
| &check; | Clicking on a popular profile follow button, users can become a follower of the selected profile
| &check; | Desktop and tablet users can view the Top Events component on the right
| &check; | Mobile users can view the Top Events component under the Popular Profiles component.
| &check; | Clicking on a top event title, users are redirected to the selected event detail page
| &check; | Users can view all events posted to the site - title, description, event date, image and tags
| &check; | Users can view the interested count
| &check; | Users can view the going count
| &check; | Users can view the comments count
| &check; | Clicking on an event image, users are redirected to the selected event detail page
| &check; | Clicking on the interested button, interested count goes up and down on a toggle
| &check; | If the logged in user is the event owner, user can not click the interested button - tooltip warning given
| &check; | Clicking on the going button, going count goes up and down on a toggle
| &check; | If the logged in user is the event owner, user can not click the going button - tooltip warning given
| &check; | If the user clicks interested, having previously clicked going, the interested count goes up, and the going count goes down.
| &check; | If the user clicks going, having previously clicked interested, the going count goes up, and the interested count goes down.
| &check; | Clicking on an event comments count, users are redirected to the selected event detail page
| &check; | Clicking on an event owner avatar, users are redirected to the selected profile page
| &check; | Users can search for a particular event by typing in the event title, the username of the event owner, the event date, or the event tag
| &check; | Users can filter the list of events by selecting a category from the category dropdown

| Status | **Add Event Page - User Logged In**
|:-------:|:--------|
| &check; | Users can view the empty form to create a new event
| &check; | Users can upload an image into the form
| &check; | Users can change an uploaded image
| &check; | Users can't submit the form without an image - warning message displayed
| &check; | Users can't submit the form without at least one tag - warning message displayed
| &check; | Users can't submit the form without filling out the event title field - warning message displayed
| &check; | Users can't submit the form without selecting an event date - warning message displayed

| Status | **Feed - User Logged In**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Users can view the follow button under each Popular Profile
| &check; | Clicking on a popular profile follow button, users can become a follower of the selected profile
| &check; | Desktop and tablet users can view the Top Events component on the right
| &check; | Mobile users can view the Top Events component under the Popular Profiles component.
| &check; | Clicking on a top event title, users are redirected to the selected event detail page
| &check; | Users can view all events posted by profiles they follow - title, description, event date, image and tags
| &check; | Users can view the interested count
| &check; | Users can view the going count
| &check; | Users can view the comments count
| &check; | Users see a new results found message if they dont' follow any profiles, or the profiles they follow haven't posted any events
| &check; | Clicking on an event image, users are redirected to the selected event detail page
| &check; | Clicking on the interested button, interested count goes up and down on a toggle
| &check; | If the logged in user is the event owner, user can not click the interested button - tooltip warning given
| &check; | Clicking on the going button, going count goes up and down on a toggle
| &check; | If the logged in user is the event owner, user can not click the going button - tooltip warning given
| &check; | If the user clicks interested, having previously clicked going, the interested count goes up, and the going count goes down.
| &check; | If the user clicks going, having previously clicked interested, the going count goes up, and the interested count goes down.
| &check; | Clicking on an event comments count, users are redirected to the selected event detail page
| &check; | Clicking on an event owner avatar, users are redirected to the selected profile page
| &check; | Users can search for a particular event by typing in the event title, the username of the event owner, the event date, or the event tag
| &check; | Users can filter the list of events by selecting a category from the category dropdown

| Status | **My Events - Going - User Logged In**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Users can view the follow button under each Popular Profile
| &check; | Clicking on a popular profile follow button, users can become a follower of the selected profile
| &check; | Desktop and tablet users can view the Top Events component on the right
| &check; | Mobile users can view the Top Events component under the Popular Profiles component.
| &check; | Clicking on a top event title, users are redirected to the selected event detail page
| &check; | Users can view all events where they have clicked the going button - title, description, event date, image and tags
| &check; | Users see a new results found message if they haven't clicked going on any event postings
| &check; | Users can view the interested count
| &check; | Users can view the going count
| &check; | Users can view the comments count
| &check; | Clicking on an event image, users are redirected to the selected event detail page
| &check; | Clicking on the interested button, interested count goes up and the going count goes down
| &check; | Clicking on the going button, going count goes up and down on a toggle
| &check; | Clicking on an event comments count, users are redirected to the selected event detail page
| &check; | Clicking on an event owner avatar, users are redirected to the selected profile page
| &check; | Users can search for a particular event by typing in the event title, the username of the event owner, the event date, or the event tag
| &check; | Users can filter the list of events by selecting a category from the category dropdown

| Status | **My Events - Interested - User Logged In**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Users can view the follow button under each Popular Profile
| &check; | Clicking on a popular profile follow button, users can become a follower of the selected profile
| &check; | Desktop and tablet users can view the Top Events component on the right
| &check; | Mobile users can view the Top Events component under the Popular Profiles component.
| &check; | Clicking on a top event title, users are redirected to the selected event detail page
| &check; | Users can view all events where they have clicked the interested button - title, description, event date, image and tags
| &check; | Users see a new results found message if they haven't clicked interested on any event postings
| &check; | Users can view the interested count
| &check; | Users can view the going count
| &check; | Users can view the comments count
| &check; | Clicking on an event image, users are redirected to the selected event detail page
| &check; | Clicking on the going button, going count goes up and the interested count goes down
| &check; | Clicking on the interested button, interested count goes up and down on a toggle
| &check; | Clicking on an event comments count, users are redirected to the selected event detail page
| &check; | Clicking on an event owner avatar, users are redirected to the selected profile page
| &check; | Users can search for a particular event by typing in the event title, the username of the event owner, the event date, or the event tag
| &check; | Users can filter the list of events by selecting a category from the category dropdown

| Status | **Event Detail Page - User Logged In**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Desktop and tablet users can view the Top Events component on the right
| &check; | Mobile users can view the Top Events component under the Popular Profiles component.
| &check; | Clicking on a top event title, users are redirected to the selected event detail page
| &check; | Users can view details of a single event - title, description, event date, image and tags
| &check; | Users can view the interested count
| &check; | Users can view the going count
| &check; | Users can view the comments count
| &check; | Clicking on an event owner avatar, users are redirected to the selected profile page
| &check; | Clicking on the interested button, interested count goes up and down on a toggle
| &check; | If the logged in user is the event owner, user can not click the interested button - tooltip warning given
| &check; | Clicking on the going button, going count goes up and down on a toggle
| &check; | If the logged in user is the event owner, user can not click the going button - tooltip warning given
| &check; | If the user clicks interested, having previously clicked going, the interested count goes up, and the going count goes down.
| &check; | If the user clicks going, having previously clicked interested, the going count goes up, and the interested count goes down.
| &check; | Users can view any published comments posted about this event
| &check; | Users can view the create comment form
| &check; | Users can type into the comment form and submit a comment to the event
| &check; | On submitting a comment, the comment count increases by 1
| &check; | If the logged in user is the owner of a published comment, they can see the three dots edit/delete menu next to it
| &check; | User can edit their own comments via the three dots edit/delete menu
| &check; | User can delete their own comments via the three dots edit/delete menu
| &check; | On clicking delete comment, user is presented with a modal popup to confirm the deletion request
| &check; | On deleting a comment, the comment count decreases by 1
| &check; | If the logged in user is the owner of the event, they can see the three dots edit/delete menu next to the created_at date
| &check; | User can edit their own events via the three dots edit/delete menu
| &check; | On clicking edit event, user is redirected to the edit events page
| &check; | User can delete their own events via the three dots edit/delete menu
| &check; | On clicking delete event, user is presented with a modal popup to confirm the deletion request

| Status | **Edit Event Page - User Logged In**
|:-------:|:--------|
| &check; | Users can view the event form pre-populated with the current event details
| &check; | Users can upload an image into the form
| &check; | Users can change an uploaded image
| &check; | Users can't submit the form without an image - warning message displayed
| &check; | Users can't submit the form without at least one tag - warning message displayed
| &check; | Users can't submit the form without filling out the event title field - warning message displayed
| &check; | Users can't submit the form without selecting an event date - warning message displayed

| Status | **Reviews - User Logged In**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Users can view the follow button under each Popular Profile
| &check; | Clicking on a popular profile follow button, users can become a follower of the selected profile
| &check; | Desktop and tablet users can view the Top Events component on the right
| &check; | Mobile users can view the Top Events component under the Popular Profiles component.
| &check; | Clicking on a top event title, users are redirected to the selected event detail page
| &check; | Users can view all events with an event date lesser than or equal to today - event owner avatar, event title, event date, average rating, reviews count
| &check; | Clicking on an event title, users are redirected to the selected event detail page
| &check; | Clicking on an event owner avatar, users are redirected to the selected profile page
| &check; | Users can search for a particular event by typing in the event title, the username of the event owner, the event date, or the event tag
| &check; | Users can filter the list of events by selecting a category from the category dropdown
| &check; | Clicking on the reviews count, will toggle open and closed the individual published reviews for the selected event
| &check; | Users can view a 'Post a Review' button
| &check; | Clicking on the 'Post a Review' button will open a modal popup to create a review
| &check; | Users own the event will receive a tooltip warning if they click the 'Post a Review' button saying 'You can't review your own event'
| &check; | Users who have already reviewed the event will receive a tooltip warning if they click the 'Post a Review' button saying 'You have already reviewed this event'
| &check; | Users receive a warning message if they try to submit a review without any comments
| &check; | On submitting a review, the review count increases by 1
| &cross; | On submitting a review, the average rating is recalculated
| &check; | If the logged in user is the owner of the review, they can see the three dots edit/delete menu next to it
| &check; | User can edit their own review comments via the three dots edit/delete menu
| &check; | On clicking edit review, user can view a popup with the review comments field pre-populated to edit.
| &check; | On clicking save in the edit review popup, the review is automatically updated with the amended comments
| &check; | User can delete their own reviews via the three dots edit/delete menu
| &check; | On clicking delete review, user is presented with a modal popup to confirm the deletion request
| &check; | On deleting a review, the review count decreases by 1

| Status | **Profile Page - User Logged In**
|:-------:|:--------|
| &check; | Users can view the Popular Profiles component
| &check; | Clicking on a popular profile avatar, users are redirected to the selected profile page
| &check; | Users can view the number of events the profile owner has posted
| &check; | Users can view the number of events the profile owner has attended
| &check; | Users can view the number of followers the selected profile has
| &check; | Users can view the number of other profiles the selected profile is following
| &check; | Users can view the events which were posted by the selected profile
| &check; | Clicking on the event image, users are redirected to the selected event detail page
| &check; | Clicking on the interested button, interested count goes up and down on a toggle
| &check; | If the logged in user is the event owner, user can not click the interested button - tooltip warning given
| &check; | Clicking on the going button, going count goes up and down on a toggle
| &check; | If the logged in user is the event owner, user can not click the going button - tooltip warning given
| &check; | If the user clicks interested, having previously clicked going, the interested count goes up, and the going count goes down.
| &check; | If the user clicks going, having previously clicked interested, the going count goes up, and the interested count goes down.
| &check; | Clicking on an event comments count, users are redirected to the selected event detail page
| &check; | Clicking on a url in the contact details section will open the web page in a new browser tab.
| &check; | If the user is viewing their own profile page, they can see the three dots edit profile menu next to the profile stats
| &check; | Users can edit their own profile page via the three dots edit/delete menu
| &check; | On clicking edit profile, user is redirected to the edit profile page
| &check; | User can edit their own username via the three dots edit profile menu
| &check; | User can edit their own password via the three dots edit profile menu
| &check; | If the user is viewing their own profile page, they can view their personal messages inbox
| &check; | In the messages inbox, users can view all messages received by other users - sender username, date sent, and message content
| &check; | Clicking on the 'reply' button of a particular message, the user can send a reply message back to the original sender in a popup modal message form
| &check; | Users receive a success alert message when a reply has been successfully sent to another user
| &check; | If the user is viewing someone else's profile page, they can see a form to send that profile user a message
| &check; | Users can't send a blank message to another profile user - warning message displayed
| &check; | Users receive a success alert message when a message has been successfully sent to another user

| Status | **Edit Profile Page - User Logged In**
|:-------:|:--------|
| &check; | Users can view the profile form pre-populated with the current profile details
| &check; | Users can upload an avatar image into the form
| &check; | Users can change the uploaded image
| &check; | Users must submit a valid URL into the URL fields - warning message displayed
| &check; | Users must submit a valid email address format into the email address field - warning message displayed
| &check; | Users must input only integers into the phone number field - warning message displayed







## Known Bugs

1. Having run the ESLint program from, the report came out with 40 errors, but no warnings. 

![EsLint Errors](images/eslint-errors.jpg)

The majority of the errors were caused due to the automatic import of 'react' into each js file, where in many in the end it is not used. I removed all of these imports, which left 9 errrors remaining. These 9 errors were caused by undefined variables in the jest test files, which I am ignoring as they are only test files. 

### Resolved