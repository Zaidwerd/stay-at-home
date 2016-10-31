const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');

// const dbConnection = 'mongodb://localhost:27017/stay-at-home';

// ADD
function addSaved(req, res, next) {
  const insertObj = {};
  // console.log('On save body: ',req.body);
  let movie;
  let recipe;

  // Credit: Bobby King for help with following code block

  for(key in req.body) {
    insertObj[key] = req.body[key];
    console.log('key: ', req.body[key]);
    if (typeof(req.body[key]) === 'string' && req.body[key].includes('movie')) movie = key;
    if (typeof(req.body[key]) === 'string' && req.body[key].includes('recipe')) recipe = key;
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
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, result) => {
        if (removeErr) return next(removeErr);
        res.removed = result;
        db.close();
        next();
      });
    return false;
  });
  return false;
}

// Save Edit
function editSaved(req, res, next) {
  getDB().then((db) => {
    db.collection('saved')
      .findAndModify({ _id: ObjectID(req.params.id) }, [] /* sort */,
      { $set: req.body.obj }, { new: true } /* options */, (updateError, doc) => {
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

// Grab Edit
function getEdit(req, res, next) {
  getDB().then((db) => {
    db.collection('saved')
      .findOne({ _id: ObjectID(req.params.id) }, (findErr, obj) => {
        if (findErr) return next(findErr);

        // return the data
        res.obj = obj;
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
