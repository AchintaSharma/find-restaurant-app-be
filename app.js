const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dbConfig = require('./configs/db.config');
const serverConfig = require('./configs/server.config');



app.use(express.json());


mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to the DB.");
});

db.once("open", () => {
    console.log("Connected to the MongoDB");
});

require('./routes/restaurant.routes')(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT : ${serverConfig.PORT}`);
})