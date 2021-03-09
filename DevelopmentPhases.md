# NotesReminderApp
This document lists various development Phases.

## Phase 1
The goal for Phase1 is to establish a successful connection between the frontend and the backend. 

There is also a focus on establishing authentication to allow:
* Registration: Creation of User Account
* Login: Allow users to login into their accounts
* Get User: Establish the ability to fetch user info - which will be used in Phase 2 for Notebooks and Notes creation - different to each user.
* Logout: Ability to end the session for a user
* (STRETCH GOAL) Reset Password: Ability to update the password for a user by sending a link via email to authenticate and create a new password.

### Different components include:
### Backend
* A golang backend with the ability to reach frontend

#### Backend Sources Used for Development
* Fiber Framework fro Authentication: https://github.com/gofiber/fiber
* Auth Database - Using Gorm with Postgres: https://gorm.io/docs/connecting_to_the_database.html#PostgreSQL
* Encrypting User Password: https://pkg.go.dev/golang.org/x/crypto/bcrypt
* JSON Web Tokens: https://jwt.io/, https://pkg.go.dev/github.com/dgrijalva/jwt-go

### Frontend
* Ability to receive and send data to backend.
* Display data on an empty page

#### Frontend Sources Used for Development
* Sign-in template picked up from Bootstrap: https://getbootstrap.com/docs/5.0/examples/sign-in/
* Bootstrap CDN: https://www.bootstrapcdn.com/
* Navigation Bar: https://getbootstrap.com/docs/4.0/components/navbar/
* HTTP Client: https://www.npmjs.com/package/axios

## Phase 2
Goal is to establish working first model of Note CRUD operations for both backend and fronend.

### Different components include:

#### Note Functionality
* Note Creation: Ability to add a subject and content to save a note
* Note Editing: Ability to edit an already created note
* Note Deletion: Ability to remove a created note
* Get Note: Ability to get a note using subject
* Get All Notes: Ability to get all notes from an account
* Get Filtered Notes: Ability to filter notes by Notebooks

#### Notebook Functionality
* Notebook Creation: Ability to add a name and Notes to save a notebook
* Notebook Editing: Ability to edit an already created notebook
* Notebook Deletion: Ability to remove a created notebook
* Get Notebook: Ability to get a notebook using name
* Get All Notebooks: Ability to get all notebooks from an account