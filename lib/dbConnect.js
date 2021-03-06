const MongoClient = require('mongodb');

// process.env.MONGOLAB_URI is DEPRECATED
// process.env.MONGODB_URI is needed for when we deploy to Heroku

// Credit: WDI Instructors Auth Template
const connectionURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/stay-at-home';

function getDB() {
  return MongoClient.connect(connectionURL);
}

module.exports = {
  getDB,
};
