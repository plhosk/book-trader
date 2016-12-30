## Book Trader - Full stack web app
Paul Hoskinson (plhosk@gmail.com)

- List of features here.

---

- Try the live version on Heroku: [https://book-trader-plhosk.herokuapp.com/](https://book-trader-plhosk.herokuapp.com/)
- Github Repository: [https://github.com/plhosk/book-trader](https://github.com/plhosk/book-trader)
- This app makes use of a book covers API.

---

### Main Technologies
- **Development**: Hot Reloading, Webpack, babel, yarn, eslint
- **Client**: React, Redux, redux-saga
- **Server**: Node/Express, Mongoose

### Technical Discussion
- Technical discussion here.

### Development Instructions
- Install [Node.js](https://nodejs.org/en/) and Git (optional)
- Clone or download the code from git repository: `git clone https://github.com/plhosk/book-trader.git`
- Enter project folder: `cd book-trader`
- Install npm packages: `npm install`
- Rename the file ".env.example" in your project directory to ".env" and add the URL to your node server (example: `SERVER_URL=http://localhost:3000`)
- Start the Node/Express web server: `npm start`
- The server provides Hot Reloading and dynamic webpack bundling in development mode. Alternatively you can build a static production bundle with `npm run build-prod` and start the production server with `npm run start-prod`
- Visit the server URL in your web browser (default port 3000): [http://localhost:3000](http://localhost:3000)
