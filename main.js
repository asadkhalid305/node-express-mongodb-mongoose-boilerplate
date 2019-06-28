/**
 * npm packages import
 */
const Http = require('http');
const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose')


/**
 * custom files import
 */
const Routes = require('./routes');
const Configurations = require('./configuration');

/**
 * initializing ExpressJS
 */
const application = Express();


/**
 * converting data and request path, that will come from client side, into JSON format
 */
application.use(BodyParser.json());
application.use(BodyParser.urlencoded({
    extended: false
}));


/**
 * inititalizing HTTP server with ExpressJS
 */
const server = Http.createServer(application);


/**
 * setting environment path and port for development/production 
 * if you are running your application on local server then development and 3010 port will be assigned to environment and port variable (you can change port according to your wish)
 * if you are running your application on domain then production and auto generated port will be assigned to environment and port variable
 */
const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3010;


/**
 * getting development/production database url from configuation.js file according to assigned value to above environment variable 
 */
const mongodb = Configurations[environment];


/**
 * mongodb  is connecting with environment path
 */
Mongoose.connect(mongodb.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
});


/**
 * mongodb (Mongoose) establishing conection with localhost/cloud
 */
const db = Mongoose.connection;


/**
 * checking for errors while connecting
 */
db.on('error', (err) => {
    console.error(`Error in connecting MongoDB:\n ${err}`);
});


/**
 * connection has been established
 * server is running perfectly
 * you can start working
 */
db.on('connected', () => {
    console.log('MongoDB is up and running!');
    Routes(application);
    server.listen(port, () => {
        console.log(`Server is up and running @${port}`);
    });
})

/**
 * TIPS
 * You can use mysql and other databases with same configuration
 * you must have to replace mongodb/mongoose native commands to connect with other database
 * if you want to change your database connection string, change it in the confguration.js file
 * mongoose is very essential to work with mongodb. Do read its documentation because this app has been configured with mongoose
 * to run application write in console "npm start"
 */