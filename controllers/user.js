/**
 * Example controller to understand how mongoose and mongodb work with logic
 */

/**
* npm package and custom file import
*/
const UserModel = require('../models/user');
const Mongoose = require('mongoose');

/**
 * all database relation work here
 */
const isUserExistInDb = (req) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      email: req.body.email
    }, (err, item) => {
      if (err) {
        reject(err);
      } else
        resolve(item)
    })
      .catch((err) => {
        reject(err);
      });
  });
}

const createNewUser = (req) => {
  return new Promise((resolve, reject) => {
    const user = new UserModel({
      id: new Mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    user.save().then((user) => {
      resolve(user);
    }).catch((err) => {
      reject(err);
    })
  })
}


/**
 * all logic here
 */
const User = {
  signup: (req, res) => {
    if (req.body.email && req.body.password) {
      isUserExistInDb(req).then((user) => {
        if (user) {
          res.status(406).send({
            message: 'failed',
            data: {
              id: user,
              details: `user already exists for following address: ${user.email}`
            }
          })
        } else {
          createNewUser(req).then((user) => {
            if (user) {
              res.status(201).send({
                message: 'success',
                data: {
                  id: user,
                  details: `account created for following address: ${user.email}`
                }
              })
            } else {
              res.status(400).send({
                message: 'failed',
                data: {
                  details: `account didn't create`
                }
              });
            }
          }).catch((err) => {
            res.status(400).send({
              message: 'failed',
              data: {
                details: err
              }
            })
          })
        }
      }).catch((err) => {
        if (err) {
          res.status(400).send({
            message: 'failed',
            data: {
              details: err
            }
          })
        }
      })
    } else {
      res.status(406).send({
        message: 'failed',
        data: {
          id: user,
          details: `email or password not found`
        }
      })
    }
  },

  login: (req, res) => {
    if (req.body.password && req.body.email) {
      isUserExistInDb(req).then((user) => {
        if (user) {
          if (req.body.password === user.password) {
            res.status(201).send({
              message: 'success',
              data: {
                id: user,
                details: `you have logged in from following address: ${user.email}`
              }
            })
          } else {
            res.status(401).send({
              message: 'failed',
              data: {
                details: 'invalid email or password'
              }
            })
          }
        } else {
          res.status(400).send({
            message: 'user does not exists'
          })
        }
      }).catch((err) => {
        res.status(400).send({
          message: 'failed',
          data: {
            details: err
          }
        })
      })
    } else {
      res.status(406).send({
        message: 'failed',
        data: {
          id: user,
          details: `email or password not found`
        }
      })
    }
  }
}

module.exports = User;