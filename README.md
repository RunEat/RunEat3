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

The **RunEat** project can include the following features:

- A **Signup/Login** page with three different options:
  - _All Beers_
  - _Random Beer_
  - _New Beer_
- A **Meal** page where you can display the main food diary and which has two main subsections:
  - _All Beers_
  - _Random Beer_
  - _New Beer_
- A **Single Beer** page to display the details of the beer the user clicked on
- A **Random Beer** page to display a Random Beer
- A **New Beer** page to show a form where a user can create new beers

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
