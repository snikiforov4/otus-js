const express = require('express');
const utils = require('./utils');

const Parser = require('rss-parser');
const {MongoClient, ObjectID} = require('mongodb');

const port = 8080;
const rssURI = "https://www.eurekalert.org/rss/technology_engineering.xml";
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'rss';
const collectionName = "eureka";

let app = express();
app.use(utils.requestTimeLog);
let db;

MongoClient.connect(dbUrl, (err, client) => {
    if (err) {
        console.log("Failed to establish connection to DB");
        throw err;
    }
    console.log("Connected successfully to server");
    db = client.db(dbName);

    app.get('/news/:id', (req, res) => {
        const collection = db.collection(collectionName);
        collection.findOne({_id: new ObjectID(req.params.id)}, (err, doc) => {
            if (err) {
                console.log("On getting news with id=%s: %s", req.params.id, err);
                res.sendStatus(500);
            } else {
                res.json(doc);
            }
        });
    });

    app.get('/news', (req, res) => {
        const collection = db.collection(collectionName);
        collection.find({}, {limit: 50}).toArray((err, docs) => {
            if (err) {
                console.log("On getting all news: %s", err);
                res.sendStatus(500);
            }
            res.json(docs);
        });
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    updateNews(db, rssURI);
});

const updateNews = function (db, uri) {
    let parser = new Parser();
    parser.parseURL(uri).then((feed) => {
        console.log("Updates has been received from RSS feed");
        const feedItems = feed.items;
        const collection = db.collection(collectionName);
        collection.insertMany(feedItems, (err, result) => {
            if (err) console.log("On saving received rss feed: %s", err);
            console.log("Inserted %s documents into '%s'", result.ops.length, collectionName);
        });
    }).catch((err) => console.log("On rss feed update: %s", err));
};
