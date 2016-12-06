"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const campaignSchema = require('../model/campaign-model');
const _ = require('lodash');

/*
campaignSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    campaign
      .find(_query)
      .exec((err, todos) => {
        err ? reject(err)
          : resolve(todos);
      });
  });
}
*/

campaignSchema.statics.uploadGymData = (campaign) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(campaign)) {
      return reject(new TypeError('Todo is not a valid object.'));
    }

    let _something = new campaign(campaign);

    _something.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
}

campaignSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    campaign
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
}

const campaign = mongoose.model('campaign', campaignSchema);

module.exports = campaign;
