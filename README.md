# RunEat
<img src="https://i.ibb.co/wpn8Rr4/Screenshot-2021-05-12-at-11-29-26.png" data-canonical-src="https://i.ibb.co/wpn8Rr4/Screenshot-2021-05-12-at-11-29-26.png" width="100%" />
<br/>

### Developers: Ángela Herrador López & Javier Repilado López.
<p>RunEat is a progressive web app to log your food intake and track your running in real time.</p>
<p>If you want to check our project on the Frontend to use is as a guide, scan the QR code from the image or try it at <a href="https://runeat.herokuapp.com/">RunEat</a> from a smartphone. Add it to home screen for a better experience (for detailed intstructions go to <a href="https://runeat.herokuapp.com/">RunEat</a> from a PC or laptop).</p>

## Technologies
- **React**
- **Server:** Node.js with Express
- **Data base:** MongoDB with Mongoose
- Authentication with JWT
- Design CSS and Bootstrap V5
- External API’s: Edamam and Google Maps
- Cloudinary
- Nodemailer and MJML
- Deployment: Heroku

## Development Methodologies
- Agile SCRUM
- Agile Kanban

## How to use the RunEat API?
If you want to develop a React app using the RunEat API, which is deployed on _heroku_, the root for the API is:
**`https://runeat-api.herokuapp.com/api`**.

The available endpoints are the following:

| Method | Endpoint            | Response (200)                                         | Action                                                                                                                                  |
| ------ | ------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /                   | [beers]                                                | Get all the beers from the DB                                                                                                           |
| GET    | /:id                | { beer }                                               | Get the a single/specific beer                                                                                                          |
| GET    | /random             | { beer }                                               | Get a random beer from the DB                                                                                                           |
| POST   | /new                | { message: "New beer successfully saved to database!"} | Create a new beer (the fields are specified in the instructions)                                                                        |
| GET    | /search?q=`{query}` | [beers]                                                | Get beers from the DB whose name contains the search term. For example `/search?q=lager` searches for all beers with lager in the name. |

The project can include the following features:

- A **Signup/Login** page with different options:
  - __Login__
  - __Signup__
  - _Go to email validation_
  - _Email validated_
  - __Finish profile__
- A **Meal** page where you can display the main food diary, which has two main subsections:
  - _Total Calories and Macros Summary_
  - _Recipes List_
- A **Single Recipe** page to display the details of a recipe the user clicked on. The user can add a recipe to its menu from this page.
- A **Sport** page to display the live running/walking tracker which has two options:
  - _Activity summary whenever an activity has been logged for the specific date_
  - _Activity tracker where the user can start an activity whenever there is no activity logged_
- A **Profile** page to show a form where the user can edit his parameters and personal information.

## Setup
- Fork this repo
- Clone this repo

```shell
$ cd RunEatAPI
$ npm install
$ npm start
```

## Contribute
- Create a new branch:
  ```
  git checkout -b "contribution_[feature to add/edit]"
  ```
  
- Upon completion, run the following commands:
  ```
  git add .
  git commit -m "contribution_[your GitHub username]"
  git push origin branch-name
  ```
  
- Create Pull Request so we can check up your work and start a discussion.
