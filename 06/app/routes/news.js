const {ObjectID} = require('mongodb');
const dbConfig = require('../config/db');

module.exports = function (app, db) {
    app.get('/news/:id', (req, res) => {
        const collection = db.collection(dbConfig.collectionName);
        collection.findOne({_id: new ObjectID(req.params.id)}, (err, doc) => {
            if (err) {
                console.log("On getting news with id=%s: %s", req.params.id, err);
                res.sendStatus(500);
                return
            }
            res.json(doc);
        });
    });

    app.get('/news', (req, res) => {
        const collection = db.collection(dbConfig.collectionName);
        collection.find({}, {limit: 50}).toArray((err, docs) => {
            if (err) {
                console.log("On getting all news: %s", err);
                res.sendStatus(500);
                return
            }
            res.json(docs);
        });
    });
};
