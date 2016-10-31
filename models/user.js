const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');
const bcrypt = require('bcryptjs');

const SALTROUNDS = 10;

// Credit: Bobby King, Rafa Pacas and the rest of the WDI Instructors for User Auth Template

// Add User
function createUser(req, res, next) {
  const userObject = {
    username: req.body.user.username,
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,

    // Store hashed password
    password: bcrypt.hashSync(req.body.user.password, SALTROUNDS),
  };

  getDB().then((db) => {
    db.collection('users')
      .insert(userObject, (insertErr, dbUser) => {
        if (insertErr) return next(insertErr);

        res.user = dbUser;
        db.close();
        return next();
      });
  });
}

// Grab User ID
function getUserById(id) {
  return getDB().then((db) => {
    const promise = new Promise((resolve, reject) => {
      db.collection('users')
        .findOne({ _id: ObjectID(id) }, (findError, user) => {
          if (findError) reject(findError);
          db.close();
          resolve(user);
        });
    });
    return promise;
  });
}

// Grab Username
function getUserByUsername(username) {
  return getDB().then((db) => {
    const promise = new Promise((resolve, reject) => {
      db.collection('users')
        .findOne({ username }, (findError, user) => {
          if (findError) reject(findError);
          db.close();
          resolve(user);
        });
    });
    return promise;
  });
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
};
