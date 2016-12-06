"use strict";

const mongoose = require('mongoose');

const _gymSchema = {
  id: {type: String, required: true, trim: true},
  name: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now}
}

module.exports = mongoose.Schema(_gymSchema);
