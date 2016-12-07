"use strict";

const mongoose = require('mongoose');

const _gymSchema = {
  id: {type: String, required: true, trim: true},
  name: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  jsonFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jsonFile' }],
  templates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'templates' }]
}

module.exports = mongoose.Schema(_gymSchema);
