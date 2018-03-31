const newsRoutes = require('./news');

module.exports = function(app, db) {
    newsRoutes(app, db);
};