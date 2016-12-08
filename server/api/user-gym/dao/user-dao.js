"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const userSchema = require('../model/user-model');
const _ = require('lodash');

const _gym = require('../../gym/dao/gym-dao');

userSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    user
      .find(_query)
      .exec((err, todos) => {
        err ? reject(err)
          : resolve(todos);
      });
  });
}

userSchema.statics.createNew = (params) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(params)) {
      console.log("NOt OBJECT ERROR");
      return reject(new TypeError('Todo is not a valid object.'));
    }
    
    /*
    let _something = new user(params.user);

    _something.save((err, saved) => {
      if(err) reject(err)
        
      resolve(saved);

      userLinkToGym(params.id, saved);
    });
    */
    console.log("BEFORE findOneAndUpdate "+JSON.stringify(params));
    
    user.findOneAndUpdate(
        params.user.email,
        params.user,
        //{ $push: { replies: reply } },
        { upsert: true }, // upsert looks to find a Message with that id and if it doesn't exist creates the Message 
        (err, saved) => {
             if(err) reject(err)
              
              console.log("ONTO findOneAndUpdate "+JSON.stringify(saved));
              
              resolve(saved);

              userLinkToGym(params.id, saved);
    });

  });
}

userSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    user
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
}

function userLinkToGym(id, params) {
   _gym.findOneAndUpdate(
        id,
        //params.user,
        { $addToSet: { users: params } },
        //{ upsert: true }, // upsert looks to find a Message with that id and if it doesn't exist creates the Message 
        (err, saved) => {
             if(err) reject(err)

             console.log("ONTO  _gym.findOneAndUpdate " + JSON.stringify(params));
             //params.gyms.push(saved);
             //params.save();          
             //params.$addToSet({ gyms: saved});
             params.gyms.addToSet(saved);   
             params.save();
    });
}

const user = mongoose.model('user', userSchema);

module.exports = user;
