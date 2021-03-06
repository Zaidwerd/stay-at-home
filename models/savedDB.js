const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');

// const dbConnection = 'mongodb://localhost:27017/stay-at-home';

// Credit: Adapted from WDI Instructor's iTunes CRUD example & iTunes Auth Users example

// ADD Movie Choice and Recipe Choice to database
function addSaved(req, res, next) {
  const insertObj = {};
  // console.log('On save body: ',req.body);
  let movie;
  let recipe;

  // Credit: Bobby King for help with following code block

  for(key in req.body) {
    insertObj[key] = req.body[key];
    // console.log('key: ', req.body[key]);
    if (typeof(req.body[key]) === 'string' && req.body[key].includes('movie')) movie = key;
    if (typeof(req.body[key]) === 'string' && req.body[key].includes('recipe')) recipe = key;
  }

  insertObj.saved.movie = movie;
  insertObj.saved.recipe = recipe;

  // Adding userId to insertObj
  insertObj.saved.userId = req.session.userId;

  // console.log(insertObj.saved);

  getDB().then((db) => {
  // Define database collection
    db.collection('saved')
      .insert(insertObj.saved, (addErr, result) => {
        if (addErr) return next(addErr);

        res.add = result;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

// Grab saved data from database to render onto page
function getSaved(req, res, next) {
  getDB().then((db) => {
  // Define database collection
    db.collection('saved')
    // find data connected to userID
      .find({ userId: { $eq: req.session.userId } })
      .toArray((saveError, data) => {
        if (saveError) return next(saveError);

        res.saved = data;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

// Delete saved data from database
function deleteSaved(req, res, next) {
  getDB().then((db) => {
  // Define database collection
    db.collection('saved')
    // Find data connectioned to userID and drop from collection
      .findAndRemove({ _id: ObjectID(req.params.id) }, (deleteErr, result) => {
        if (deleteErr) return next(deleteErr);

        res.removed = result;
        db.close();
        next();
      });
    return false;
  });
  return false;
}


// Grab saved data from database to render on to edit page
function getEdit(req, res, next) {
  getDB().then((db) => {
    // Define database collection
    db.collection('saved')
    // Grab object from collection by id
      .findOne({ _id: ObjectID(req.params.id) }, (editErr, obj) => {
        if (editErr) return next(editErr);

        // return the data
        res.obj = obj;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

// Save Edit
function editSaved(req, res, next) {
  getDB().then((db) => {
    // Define database collection
    db.collection('saved')
    // Find object by id and and save changes
      .findAndModify({ _id: ObjectID(req.params.id) }, [],
      { $set: req.body.obj }, { new: true }, (updateError, doc) => {
        if (updateError) return next(updateError);

        // return the data
        res.edit = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

module.exports = {
  getSaved,
  addSaved,
  editSaved,
  deleteSaved,
  getEdit,
};
