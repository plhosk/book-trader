## Book Trader - Full stack web app
Paul Hoskinson (plhosk@gmail.com)

![Book-trader screenshot](https://raw.githubusercontent.com/plhosk/temp/master/screenshot-book-trader.png)

- Add your books by entering the ISBN. Browse books that others have added.
- Request a book trade by selecting the book you want and offering one of your own in return.
- View and manage your incoming and outgoing trade offers.

---

- Try the live version on Heroku (may take a few seconds to load the first time): [https://book-trader-plhosk.herokuapp.com/](https://book-trader-plhosk.herokuapp.com/)
- Github Repository: [https://github.com/plhosk/book-trader](https://github.com/plhosk/book-trader)
- This app makes use of the [Open Library Search API](https://openlibrary.org/dev/docs/api/search).

---

### Main Technologies
- **Development**: Hot Reloading, Webpack, babel, yarn, eslint
- **Client**: React, Redux, redux-saga
- **Server**: Node/Express, Mongoose

### Technical Discussion
- This project was an exercise to teach myself how to develop a full stack web app. Rather than use create-react-app or another boilerplate, I wanted to do everything from the ground up. I've tried to make the code as well-structured and readable as possible and follow best practices but there are bound to be some messy areas.
- The project consists of a Single Page App client written with React, Redux and React Router, and a Node server using Express and Mongoose.
- The server provides basic authentication, hot-reloading and a REST API to serve and update information on a remote MongoDB database. All main content types on the client can be hot-reloaded (React components, Redux reducers, redux-saga Sagas)
- The client makes use of Redux and Redux-Saga to organize and update local data and perform asynchronous API fetches. React Router is used to vary the displayed content depending on URL path.
- The project is configured with Webpack 3, hot-reloading, babel, yarn and ESLint for ease of development.

### Development Instructions
- Install [Node.js](https://nodejs.org/en/) and Git (optional)
- Clone or download the code from git repository: `git clone https://github.com/plhosk/book-trader.git`
- Enter project folder: `cd book-trader`
- Install npm packages: `yarn`
- Rename the file ".env.example" in your project directory to ".env" and assign the URL of your node server to the SERVER_URL variable (example: `SERVER_URL=http://localhost:3000`)
- Start the Node/Express web server: `yarn start`
- Visit the server URL in your web browser (default port 3000): [http://localhost:3000](http://localhost:3000)
- The server provides Hot Reloading and dynamic webpack bundling in development mode. Alternatively you can build a static production bundle with `yarn build-prod` and start the production server with `yarn start-prod`
