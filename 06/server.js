const express = require('express');
const utils = require('./utils');

const parser = require('xml2json');
const request = require('request');
// const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectID;

const port = 8080;
const rssURI = "https://www.eurekalert.org/rss/technology_engineering.xml";
const rssItems = [];
// const PERSONS = "persons";

let app = express();
app.use(utils.requestTimeLog);

// TODO code from lecture
// MongoClient.connect("mongodb://localhost:27017", (err, db) => {
//     if (err) return console.log(err);
//     let dbo = db.db("mydb");
//
//     app.get('/person/:id', (req, res) => {
//         dbo.collection(PERSONS).findOne({_id: new ObjectId(req.params.id)}, (err, doc) => {
//             if (err) console.log(err);
//             res.send(doc);
//         });
//     });
//
//     app.post('/person', (req, res) => {
//         const person = req.body;
//         dbo.collection(PERSONS).insertOne(person, (err) => {
//             if (err) console.log(err);
//             res.send(person);
//         });
//     });
//
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     });
// });

const updateNews = function (uri) {
    request(uri, function (error, response, body) {
        if (error) {
            console.log('statusCode: %s, error: %s', response && response.statusCode, error);
        }
        try {
            let json = parser.toJson(body, {object: true});
            const items = json.rss.channel.item;
            for (let item of items) {
                rssItems.push(item);
            }
            console.log("Updates has been received from RSS feed");
        } catch (e) {
            console.log("On parsing rss feed: %s", e)
        }
    });
};

app.get('/news/:id', (req, res) => {
    try {
        const item = rssItems[req.params.id - 1];
        res.status(200).json(item);
    } catch (e) {
        console.log("On getting news with id=%s: %s", req.params.id, e);
        res.sendStatus(500);
    }
});

app.get('/news', (req, res) => {
    res.send(rssItems);
});

updateNews(rssURI);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});