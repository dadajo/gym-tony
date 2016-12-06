"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const gymSchema = require('../model/gym-model');
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

gymSchema.statics.upload = (file) => {
    var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    sampleFile = req.files.sampleFile;
    sampleFile.mv('/somewhere/on/your/server/filename.jpg', (err) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
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

module.exports = gym;
