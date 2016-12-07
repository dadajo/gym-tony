"use strict";

const mongoose = require('mongoose');
//const _gymSchema = require('../../gym/model/gym-model');

const _templatesSchema = {
  //id: {type: Number, default: 0, required: true},
  name: {type: String, required: true, trim: true},
  description: {type: String, required: true, trim: true},
  templateUrl: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  //gym: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gym' }]
}

module.exports = mongoose.Schema(_templatesSchema);
