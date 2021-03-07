# NotesReminderApp
This document lists various development Phases.

## Phase 1
The goal for Phase1 is to establish successful connection between thr frontend and the backend. 

There is also focus on estabilishing authentication to allow:
* Registration: Creation of User Account
* Login: Allow users to login into their accounts
* Get User: Establish the ability to fetch user info - which will be used in Phase 2 for Notebooks and Notes creation - different to each user.
* Logout: Ability to end session for a user
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

