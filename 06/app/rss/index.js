const Parser = require('rss-parser');
const dbConfig = require('../config/db');
const rssConfig = require('../config/rss');

const receiveLatestNews = function (db) {
    let parser = new Parser();
    parser.parseURL(rssConfig.url).then((feed) => {
        console.log("Updates has been received from RSS feed");
        const feedItems = feed.items;
        const collection = db.collection(dbConfig.collectionName);
        collection.insertMany(feedItems, (err, result) => {
            if (err) {
                console.log("On saving received rss feed: %s", err);
            } else {
                console.log("Inserted %s documents into '%s'", result.ops.length, dbConfig.collectionName);
            }
        });
    }).catch((err) => console.log("On rss feed update: %s", err));
};

exports.receiveLatestNews = receiveLatestNews;