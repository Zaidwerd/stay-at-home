const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');

// const dbConnection = 'mongodb://localhost:27017/stay-at-home';

// ADD
function addSaved(req, res, next) {
  // creating an empty object for the insertObj
  const insertObj = {};
  // console.log('On save body: ',req.body);
  let movie;
  let recipe;
  // copying all of req.body into insertObj
  for(key in req.body) {
    insertObj[key] = req.body[key];
    console.log('key: ', req.body[key]);
    if(typeof(req.body[key]) === 'string' && req.body[key].includes('movie')) movie = key;
    if(typeof(req.body[key]) === 'string' && req.body[key].includes('recipe')) recipe = key;
  }
  insertObj.saved.movie = movie;
  insertObj.saved.recipe = recipe;

  // Adding userId to insertObj
  insertObj.saved.userId = req.session.userId;

  console.log(insertObj.saved);
  getDB().then((db) => {
    db.collection('saved')
      .insert(insertObj.saved, (insertErr, result) => {
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
  getDB().then((db) => {
    db.collection('saved')
      .find({ userId: { $eq: req.session.userId } })
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
  getDB().then((db) => {
    db.collection('saved')
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
        if (removeErr) return next(removeErr);

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
