# BudCode Frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/5134dbb2-110c-4b3c-84b3-b31b510e0b7d/deploy-status)](https://app.netlify.com/sites/budcode/deploys)

This is the frontend service for the BudCode project. The project is created with the PERN stack (PostgreSQL, Express, React, and Node). The frontend service was developed by Anvinh Truong, Saiful Islam, and Tufayel Ahmed for our Spring 2022 CSc 59867 Senior Design Project II course at The City College of New York.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Context

There is a lack of access for resume builders (e.g., college students, new grads) and any level developer to gain experience working in software development group environments. Not everyone has the network to work with others, so finding new people to work with will help all parties grow and gain more experience. This will also help these developers in landing job opportunities due to how important previous projects are for employers, especially projects done in team environments.

BudCode is an online platform that allows software developers, at any level (novice students to seasoned professionals), to collaborate. BudCode allows innovators to look for team members by posting their project ideas along with relevant information about the project (description, requirements, keywords, etc.) to the website. The platform provides more features that aim to serve as interest points for developers, such as personalized project recommendations, recruiting potential team members, and much more.

## Setup

### Clone the repository

```bash
git clone https://github.com/saifulislamdev/budcode-frontend
```

### Install dependencies

```bash
npm i
```

### Setup env file

Create an .env file in the root of the repository with the following environment variables.

```bash
REACT_APP_PROXY="http://localhost:5000/api" # proxy server (value shown is default)
```

### Run app

Run `npm start` (refer to [Available Scripts](##Available-Scripts) section for more info)

## Repo Structure

All of the source code will be found in `/src` folder.

### Components

Components go in the `/src/components` folder.

### Pages

Pages go in the `/src/pages` folder.

### Utility

Config, global constants, helper functions, etc. go in the `/src/util` folder.

### Assets

Images go in the `/src/assets` folder.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
