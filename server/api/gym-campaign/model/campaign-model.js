"use strict";

const mongoose = require('mongoose');
//const _gymSchema = require('../../gym/model/gym-model');

const _campaignSchema = {
  usersCount: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
  //gym: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gym' }]
}

module.exports = mongoose.Schema(_campaignSchema);
