"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const gymSchema = require('../model/gym-model');
const jsonFileSchema = require('../model/jsonFile-model');
const templatesSchema = require('../model/templates-model');
const _ = require('lodash');

gymSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    gym
      .find(_query)
      .exec((err, todos) => {
        err ? reject(err)
          : resolve(todos);
      });
  });
}

gymSchema.statics.createNew = (gym) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(gym)) {
      return reject(new TypeError('Todo is not a valid object.'));
    }

    let _something = new gym(gym);

    _something.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

gymSchema.statics.upload = (file, data) => {
  return new Promise((resolve, reject) => {
    console.log(data);

    if (!file) {
        console.log(file);
        return reject(new TypeError('No file'))//resolve({"status":"mrr"});
    }
    console.log(file);

    let _file = new jsonFile({name: file.filename, ubicated: file.path});

    _file.save((err, saved) => {
      err ? reject(err)
        : resolve({"data":saved,"error": 0});
    });
  });//end promise
}

gymSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    gym
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
}

const gym = mongoose.model('gym', gymSchema);
const jsonFile = mongoose.model('jsonFile', jsonFileSchema);
const templates = mongoose.model('templates', templatesSchema);

module.exports = gym;
