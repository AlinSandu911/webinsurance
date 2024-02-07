# webinsurance

Insurance website.


This project is a Node.js web application designed around insurance websute functionalities, developed using the Express.js framework. The database has been created.

Before you check the webapp, please make sure you have "npm" installed. After installing npm, type "npm start" in the terminal and access localhost:5000 in the browser.
The "npm start" command to run the server, is typically configured in the "package.json" file.


 "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",

"start": "nodemon server.js"

In this case, when you run "npm start", it's equivalent to running "node server.js".

ENJOY!

### Developer ###

# Install nodemon

npm install nodemon 

# Install dependencies

 "dependencies": {
    "alert": "^5.1.6",
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "mongodb": "^4.17.2",
    "mongoose": "^8.1.1",
    "node-notifier": "^10.0.1"
  }

ex: npm install bcrypt

In the development phase, numerous developers leverage the nodemon package for its ability to automatically restart the server whenever a file is saved. This proves exceptionally advantageous, eliminating the need for manual server restarts after each modification. This real-time responsiveness greatly facilitates the development process, allowing developers to witness changes instantly as they occur.

 # Set up Express
 # Set up MongoDB & Atlas and the connection with
 # Define models
 # Set up ejs templates
