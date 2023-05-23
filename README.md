# **Happening**

I live in a small town of around 15,000 people in the south of Spain, where lots of great events happen, but unlike in the big cities, there are no websites or applications dedicated to publicising the event information out to the people.

The most similar browser-based events platform that exists today would be Eventbrite. If I do a search in Eventbrite for events filtered by my town, the closest event is 100Km away. Even though I know there are lots of great events happening every day on my doorstep, there is no single application or website where I can see them. These days, people simply rely on diffusion via Whatsapp groups and posters in the streets. 

Happening provides an interactive platform to create, view, edit and delete event information for a local area. A user who wishes to share an event can upload information about the event, including the date, a description, a category for who it's ideally aimed at, an image or event poster, and keyword tags. A user who wishes to attend events can follow event hosts, show their interest in an event, mark as attending an event, comment on an event and write a review for an event. 

This fictional site was created for Portfolio Project #5 (Advanced Front End) - Diploma in Full Stack Software Development Diploma at the [Code Institute](https://www.codeinstitute.net).

[View live website here](https://happening-react.herokuapp.com/)

![Responsive design](static/images/readme/devicemockup.png)

## Table of Contents

- [Project](<#project>)
    * [Objective](<#objective>)
    * [Site Users Goal](<#site-users-goal>)
    * [Site Owners Goal](<#site-owners-goal>)
    * [Project Management](<#project-management>)

- [User Experience (UX)](<#user-experience-ux>)
    * [Wireframes](<#wireframes>)
    * [User Stories](<#user-stories>)
    * [Site Structure](<#site-structure>)
    * [Design Choices](<#design-choices>)

- [Existing Features](#features)
  * [Homepage](#homepage)
  * [Profile Data](#profile-list)
  * [Events Data](#events-list)
  * [Comments Data](#comments-data)
  * [Interested Data](#interested-data)
  * [Going Data](#going-data)
  * [Followers Data](#followers-data)
  * [Reviews Data](#reviews-data)
  * [Contact Data](#contact-data)

- [Features Left To Implement](<#features-left-to-implement>)

- [Technologies Used](<#technologies-used>)
    * [Languages](<#languages>)
    * [Frameworks & Software](<#frameworks--software>)
    * [Libraries](<#libraries>)
- [Agile Workflow](#agile-workflow)
  * [Github Project Board](#github-project-board)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)

# **Project**

## Objective

The objective of this project is to build a community-based content sharing web application for a small local area allowing users to learn about events happening in the area and to interact with the published content. The platform allows users to view, create, edit, delete, comment and review event postings. The content can be viewed in a logical order,  filtered by category, and searched on by keywords. Users can also follow each other and register their interest in other user's shared content. 

## Site User's Goal

There are primarily two types of users who will be interacting with this platform. Users who host events in the local area, and users who attend events in the local area. Of course there will also be some cross over between the two groups for those who post events but also attend them as well.

The event hosts wants to share the details of upcoming events with as many members of the local community in one single sharing platform and then gauge two things as a result of the post. Prior to the event happening, the user can see how many people are interested in the event or plan to attend the event. They can also read people's comments regarding the event, and receive messages from interested users who have questions. After the event has taken place, they can read reviews given about the event and see individual ratings and an overall average rating for the event. 

All remaining members of the community who are not hosting events, want to find out about all the upcoming events happening in the local area in one single platform. The users can view the full details of each event in an ordered manner, or filter the full list of events based on their personal preferences. Users can show their interest in an event or show they plan to attend. They can write public comments about the event while it is being advertised for others to read, and once the event has taken place they can add a review as well, giving the hosts and other users excellent feedback. If in doubt users can send each other direct messages, or find further contact details within the profile page. 

## Site Owner's Goal

As the site owner, I saw a problem in the town where I live which I have tried to solve with this platform. I want all members of the local community to be able to find out what is happening in the town in a single dedicated platform. However, not only can they simply see all the event posters listed in one place, they also have the ability to interact with the content, share opinions publicly and contact the event organisers. 

## Project Management

### Github Project Board

I've been using the project board in GitHub to keep my project together. In the initial design phase, it was really helpful to plan the project as a whole, and create the user stories based on my wireframe designs. I created a Milestone for each main app created in the backend API plus one additional for Navigation and Authentication, in order to maintain a similar structure to the backend Project Board. Each milestone has a list of bullet points for the main desired frontend features. Then, I created a linked User Story for each feature and gave it a level of prioritization using the MoSCoW method and a number of User Story points to indicate the level of difficulty for that feature.

Later on, during the build, I also used the Project Board to log and track bugs found in my code which could not be fixed immmediately. Where git commits are directly related to a user story, the commit message has been linked to the user story via the hashtag numbering system. 

![User Stories](images/user-stories.jpg)

### Database Schema

All the models have been set up in a separate DRF repository. Click [here](https://github.com/quiltingcode/events-backend-api) to view the repository or [here](https://happening-api-kelz.herokuapp.com/) to view the deployed API.

 
[Back to top](<#table-of-content>)

# **User Experience (UX)**

## Wireframes

The wireframes for the site were created in the software [Balsamiq](https://balsamiq.com). The wireframes have been created principally for desktop devices as this is a browser based platform. However, the wesbite is responsive for tablet and mobile, and I have created additional wireframes to show how the various events pages and profile page adapt to smaller devices. The main grid layout of the components is initially based on the CI Moments walkthrough tutorial as this seems to me the best layout both for wider desktops as for smaller mobile devices for a content sharing platform so I didn't see much reason to change it or find many areas where I could improve on it. Any differences are down to personalised content that fits the project goals.

<details><summary><b>Wireframes</b></summary>

![Events Page](images/events-page.png)
![Events Detail Page](images/event-detail.png)
![Events Page - Mobile](images/events-page-mobile.png)
![Profile Page](images/profile-page.png)
![Profile Page - Mobile](images/profile-page-mobile.png)
![Reviews Page](images/reviews-page.png)
![Reviews Page - Comments](images/review-comments.png)

</details><br/>

## User Stories
Here I have listed the main user stories for a user who is not logged in, or has no account and a logged in user. These user stories were then tested and confirmed in the [Testing](<#testing>) section.

### Logged Out Site User
|  | | |
|:-------:|:--------|:--------|
| As a Logged out User | I can log in so that I can interact fully with the site | &check; |
| As a Logged out User | I can sign up so that I can interact fully with the site | &check; |
| As a Logged out User | I can see a list of all events so that I can see all events that have been shared to the site | &check; |
| As a Logged out User | I can view a single event so that I can see single event details| &check; |
| As a Logged out User | I can view the top upcoming events so that I know which events have the highest going count | &check; |
| As a Logged out User | I can view the popular profiles so that I can see who has the most followers | &check; |
| As a Logged out User | I can view the details of an individual profile page so that I can see more profile data | &check; |
| As a Logged out User | I can filter events by category so that I can view only the events I'm interested in | &check; |
| As a Logged out User | I can search events by title, profile, date or tag so that I can find one particular event | &check; |
| As a Logged out User | I can view comments of an event so that I can see what other users think about the event | &check; |

### Logged In Site User
|  | | |
|:-------:|:--------|:--------|
| As a Logged in User | I can log in so that I can interact fully with the site | &check; |
| As a Logged in User | I can log out from the site so that no-one else can interact with the site using my details | &check; |
EVENTS
| As a Logged in User | I can see a list of all events so that I can see all events that have been shared to the site | &check;
| As a Logged in User | I can view a single event so that I can see single event details | &check; |
| As a Logged in User | I can view the top upcoming events so that I know which events have the highest going count | &check; |
| As a Logged in User | I can view the feed page so that I can only see events of profiles I follow | &check; |
| As a Logged in User | I can view the My Events page so that I can see only the events i'm interested in or going to | &check; |
| As a Logged in User | I can view the details of an individual profile page so that I can see more profile data | &check; |
| As a Logged in User |  I can see all the events from one profile so that I can view all the events of one profile easily | &check; |
| As a Logged in User | I can filter events by category so that I can view only the events I'm interested in  | &check; |
| As a Logged in User | I can search events by title, profile, date or tag so that I can find one particular event | &check; |
| As a Logged in User | I can create a new event so that I can promote an event in the town| &check; |
| As a Logged in User | I can edit my events so that I can change the details or correct mistakes | &check; |
| As a Logged in User | I can delete my own events so that I can remove events from the site | &check; |
INTERESTED/GOING
| As a Logged in User | I can add interested to a post so that I can publicly display my interest in an event | &check; |
| As a Logged in User | I can remove interested to a post so that I can remove interest in an event if i change my mind | &check; |
| As a Logged in User |  I can add going to an event so that I can publicly show that i plan to attend | &check; |
| As a Logged in User | I can remove going from an event so that I can remove going to an event if i no longer plan to attend | &check; |
COMMENTS
| As a Logged in User | I can view comments of an event so that I can see what other users think about the event | &check; |
| As a Logged in User | I can create a comment so that I can publicly show my thoughts about an upcoming event | &check; |
| As a Logged in User | I can edit my comments so that I can correct mistakes | &check; |
| As a Logged in User | I can delete a comment that I created so that I can remove comments as I see fit | &check; |
| As a Logged in User | I can delete a comment that I created so that I can remove comments as I see fit | &check; |
FOLLOW
| As a Logged in User | I can follow another user so that I can see their events in my feed page | &check; |
| As a Logged in User | I can unfollow another user so that I can stop seeing their events in my feed page | &check; |
REVIEWS
| As a Logged in User | I can view all events that have happened so that I can see their average rating and review count | &check; |
| As a Logged in User | I can view all the reviews relating to a single event so that I can see other user's opinions of the event | &check; |
| As a Logged in User | I can post a review on a past event so that I can share my opinion on the event | &check; |
| As a Logged in User | I can edit my own reviews so that I can correct my comments | &check; |
| As a Logged in User | I can delete a review that I created so that I can remove reviewsI no longer want published | &check; |
PROFILES
| As a Logged in User | I can view the popular profiles so that I can see who has the most followers | &check; |
| As a Logged in User | I can view the profile page of another user so that I can see more details about that user | &check; |
| As a Logged in User | I can edit my own profile page so that I can add additional information for other users to see about me | &check; |
| As a Logged in User | I can change my username and password so that I can change my login details if I feel they are not secure | &check; |
| As a Logged in User | I can change my username and password so that I can change my login details if I feel they are not secure | &check; |
CONTACT
| As a Logged in User | I can view messages in my profile page so that I can read messages other users have sent me | &check; |
| As a Logged in User | I can send a message to another user so that I can ask a question about an event they are hosting | &check; |



[Back to top](<#table-of-content>)

## Site Structure


Read more about the different choices in the [Features](<#features>) section.


## Design Choices

* ### Color Scheme
* ### Typography

[Back to top](<#table-of-content>)