const express = require('express');
const {MongoClient} = require('mongodb');
const mw = require('./app/middleware');
const dbConfig = require('./app/config/db');

const port = 8080;
let app = express();
app.use(mw.requestLogger);
app.use(mw.errorHandler);

MongoClient.connect(dbConfig.url, (err, client) => {
    if (err) {
        console.log("Failed to establish connection to DB");
        throw err;
    }
    console.log("Connected successfully to server");
    db = client.db(dbConfig.name);
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    require('./app/rss').receiveLatestNews(db);
});

