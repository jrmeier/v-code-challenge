# Veritone Full Stack Developer Challenge

## Overview

Hello! Thanks for reviewing my submission for the Veritone Full Stack Developer Challenge. This project is a simple web application that allows users to create a shopping list and add items to it. The frontend is written in React and the backend is written in Go. This my first "go" at "Go", so please excuse any bad practices or code smells.

Want to see it right now? [Click here](https://jrmeier.github.io/v-code-challenge/) to see the application in action. Since this is a React application, I thought it made sense to make it workout without the Go backend. Using it on the above link will allow you to use the application normally. The items you add will be stored in your browser's local storage. If you want to see the application in action with the Go backend, you can follow the instructions below.

## Installing and running the application in dev mode

### Tl;dr

Copy and paste the following commands to run the application in development mode:

This will clone the repository, install the dependencies, and start the frontend server.

```shell
git clone git@github.com:jrmeier/v-code-challenge.git
cd v-code-challenge && npm i
cd backend && go get
cd .. && npm start
```

Once the frontend server is running, open a new terminal window. Then, run the following command to start the backend server.

```shell
cd ./backend && go run server.go
```

### Requirements

Its expected that you have the following installed on your machine:
    Node.js (16.5.5)
    Go (1.20)

### Installing the application

First, clone this repository:

```shell
git clone git@github.com:jrmeier/v-code-challenge.git
```

Then navigate to the `v-code-challenge` directory and run `npm i` to install the frontend dependencies.

```shell
cd v-code-challenge && npm i
```

Then navigate to the `backend` directory and run `go get` to install the backend dependencies

```shell
cd backend && go get
```

### Running the application

To run the application, navigate to the `v-code-challenge` directory and run `npm start`. This will start the frontend server on port 3000. Then, navigate to the `backend` directory and run `go run server.go`. This will start the backend server on port 5000.

## TODO

Given more time, I would have liked to implement the following features:

[ ] add login functionality
[ ] allow users to have/select multiple lists
[ ] 100% responsive
[ ] More tests (component and unit)
[ ] PWA - if the go backend isn't running, seemlessely transition to a local storage based solution, and then sync with the backend when it's available again
[ ] Split the server.go into a proper Go application
[ ] Add testing for the Go service
[ ] Better error handling with notifications
