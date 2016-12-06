"use strict";

const mongoose = require('mongoose');

const _campaignSchema = {
  id: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  lastViewed: {type: Date},
  createdAt: {type: Date, default: Date.now}
}

module.exports = mongoose.Schema(_campaignSchema);
