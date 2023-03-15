# Veritone Full Stack Developer Challenge

## Overview

Hello! Thanks for reviewing my submission for the Veritone Full Stack Developer Challenge. This project is a simple web application that allows users to create a shopping list and add items to it. The frontend is written in React and the backend is written in Go. This my first "go" at "Go", so please excuse any bad practices or code smells.

## Tl;dr

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
cd backend && go run server.go
```

## Installing the application

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

## Running the application

To run the application, navigate to the `v-code-challenge` directory and run `npm start`. This will start the frontend server on port 3000. Then, navigate to the `backend` directory and run `go run server.go`. This will start the backend server on port 5000.

## TODO

Given more time, I would have liked to implement the following features:

[ ] add login functionality
[ ] allow users to have/select multiple lists
[ ] allow users to share lists with others
[ ] 100% responsive
[ ] PWA - if the go backend isn't running, seemlessely transition to a local storage based solution, and then sync with the backend when it's available again
