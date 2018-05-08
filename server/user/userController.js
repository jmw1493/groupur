const mongoose = require('mongoose');
const User = require('./userModel');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

// post that will contain username and password to create a new user or login 
const userController = {
    
    signup: function (req, res) {
        req.on('error', (err) => { console.log(err) });
      
        if (!req.body.username || !req.body.password) {
          return res.status(403).send('Invalid Input');
        }
      
        let newUser = {
          username: req.body.username,
          password: req.body.password,
          // firstName: req.body.firstName,
          // lastName: req.body.lastName,
          // group: req.body.group
        }

        User.findOne({username: newUser.username}, (err, doc) => {
          if(doc) return res.send({message: 'User already exists'}); 
          User.create(newUser, (err, createdUser) => {
            if(createdUser) {
              res.send({
                activeSession: true,
                user: createdUser
              });
            }
          });
        });
    },

    verify: function (req, res) {
      req.on('error', (err) => { console.log(err) });
        if (!req.body.username || !req.body.password) {
          return res.status(403).send('Invalid Input');
        }
      
      let loginUserRequest = {
        username: req.body.username,
        password: req.body.password
      }
      console.log('about to find user in database')
      
      User.findOne({username: loginUserRequest.username}, (err, user) => {
        if (err || !user) return res.end();
        if (!bcrypt.compareSync(loginUserRequest.password, user.password)) {
          console.log('password not found')
          return res.end();
        }
        console.log('password found')
        // res.locals.user = user;
        res.send({
          activeSession: true,
          user: user
        });
      })

        // User.checkPassword(loginUserRequest, (doc, valid) => {
        //   if(valid) {
        //     res.locals.user = doc;
        //     res.send(res.locals.user);
        //   }
        //   res.status(500).send('User not found. Please try again');
        // })
    },

    addGroup: function (req, res) {
      User.findOneAndUpdate({username: req.body.user}, { 
        $push: {
          groups: {
            $each: [ { group_name: req.body.value } ]
          }
        }
      }, {new: true}, (err, user) => {
        if (err) return res.sendStatus(400);
        res.send(user.groups[user.groups.length - 1]);
      })
    },

    removeGroup: function (req, res) {
      User.findOneAndUpdate({username: req.body.user}, { 
        $pull: { 
          groups: {
            $in: [req.body.value]
          }
        }
      }, {new: true}, (err, user) => {
        if (err) return res.sendStatus(400);
      })
    }

}

module.exports = userController;