# Joel Spinelli's Personal Portfolio

Webpage made with React to display some basic information about myself and show some projects I made.

It features:
* A projects section in which other works made by me can be seen.
* A fully functional contact form that allows the user to directly send me an email without leaving the website. 
* An accessible and fully responsive UI that follows the Web Content Accessibility Guidelines (WCAG) 2.1 (AAA).

To build it I used the following: 
* React 
* NodeJS 
* Express 
* Sass

## Production URL: https://joelspinelli.netlify.app/

## In case you want to run this project in your local environment: 
You need to have both node and npm installed on your computer. I recommend installing them by using the [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm), otherwise you can download them from [here](https://nodejs.org/en). 

To build this project I used Node v16.15.1 and npm v8.11.0, so it's also advisable that you use the same versions. 

**Follow these steps:** 
1. Open the project on your preferred code editor. 
1. Open a terminal and go inside the frontend directory: **cd frontend**
1. Run the following command: **npm install**
1. Run the following command: **npm start**

**Optional:** You could also make the contact form functional, but that will require extra, more complex steps: 
1. Open a new terminal and go inside the backend directory: **cd backend** 
1. Run the following command: **npm install**
1. Create a file called **.env** and inside of it declare the following environment variables: 
    1. **EMAIL**=insert_here_your_email (use a gmail account)
    1. **PASS**=insert_here_your_application_password (if you want to be able to use the contact form, you'll need to create an application password for your gmail account and authorize it)
    1. **PORT**=port_in_which_you_want_to_run_the_project's_backend_server 
    1. **ALLOWED_ORIGIN**=http://localhost:frontend_development_server_port
1. Create a file called .env inside of the frontend folder, and declare this variable: **REACT_APP_SERVER_URL=http://localhost:YOUR_FRONTEND_SERVER_PORT/** 
1. Run the following command: **npm run devStart**

## Screenshots
![Screenshot of Joel's portoflio 1 of 4. It's the initial view, which is a picture of Joel coding con his laptop.](./screenshots/screenshot1.png)

![Screenshot of Joel's portoflio 2 of 4. It's the about-me section of the portfolio, which tells a little about Joel's professional experience and shows his technology stack.](./screenshots/screenshot2.png)

![Screenshot of Joel's portoflio 3 of 4. It's the projects section of Joel's portfolio, which contains cards with some information about each one of the projects.](./screenshots/screenshot3.png)

![Screenshot of Joel's portoflio 4 of 4. It's the contact form of Joel's portfolio.](./screenshots/screenshot4.png)

_I don't claim ownership for any of the images used on it (beside the ones that include myself in them)._
