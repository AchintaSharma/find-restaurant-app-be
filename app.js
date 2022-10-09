//Import the dependencies 
const express = require('express');
const mongoose = require('mongoose');


//Create app 
const app = express();


//Import config files
const dbConfig = require('./configs/db.config');
const serverConfig = require('./configs/server.config');


//Read JSON request body
app.use(express.json());


//Connect to the DB
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to the DB.");
});

db.once("open", () => {
    console.log("Connected to the MongoDB");
});


//Plug in routes
require('./routes/restaurant.routes')(app);


//Start the server
app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT : ${serverConfig.PORT}`);
})