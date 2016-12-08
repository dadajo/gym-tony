"use strict";

const mongoose = require('mongoose');
const _gymSchema = require('../../gym/model/gym-model');

const _userSchema = {
  id: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  lastViewed: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now},
  gyms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gym' }]
}

module.exports = mongoose.Schema(_userSchema);
