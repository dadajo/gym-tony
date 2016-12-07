"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const userSchema = require('../model/user-model');
const _ = require('lodash');

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

userSchema.statics.createNew = (user) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(user)) {
      return reject(new TypeError('Todo is not a valid object.'));
    }

    let _something = new user(user);

    _something.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
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

const user = mongoose.model('user', userSchema);

module.exports = user;
