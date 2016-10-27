const { MongoClient, ObjectID } = require('mongodb');

const dbConnection = 'mongodb://localhost:27017/stay-at-home';

// ADD
function addSaved(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('saved')
      .insert(req.body.saved, (insertErr, result) => {
        if (insertErr) return next(insertErr);

        res.add = result;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

// Grab
function getSaved(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('saved')
      .find({})
      .toArray((arrayError, data) => {
        if (arrayError) return next(arrayError);

        res.saved = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}


// Delete
function deleteSaved(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('saved')
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
        if (removeErr) return next(removeErr);

        // return the data
        res.removed = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

module.exports = {
  deleteSaved,
  getSaved,
  addSaved,
};
