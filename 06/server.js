const express = require('express');
const {MongoClient} = require('mongodb');
const mw = require('./app/middleware');
const dbConfig = require('./app/config/db');
const appConfig = require('./app/config/app');

let app = express();
app.use(mw.requestLogger);

MongoClient.connect(dbConfig.url, (err, client) => {
    if (err) {
        console.log("Failed to establish connection to DB");
        throw err;
    }
    console.log("Connected successfully to server");
    const db = client.db(dbConfig.name);
    require('./app/routes')(app, db);
    app.use(mw.errorHandler);
    app.listen(appConfig.port, () => {
        console.log(`Server is running on http://localhost:${appConfig.port}`);
    });
    require('./app/rss').receiveLatestNews(db);
});
