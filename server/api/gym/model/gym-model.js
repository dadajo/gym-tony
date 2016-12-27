"use strict";

const mongoose = require('mongoose');
const _userSchema = require('../../user-gym/model/user-model');
const _jsonFileSchema = require('./jsonFile-model');
const _templatesSchema = require('./templates-model');

const _gymSchema = {
  id: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  headerurl: { type: String, required: true, trim: true, default: 'uploads\images\default' },
  emailConfig: { 
    smtpConfig: {
        host: { type: String, trim: true },
        port: { type: Number },
        secure: { type: Boolean },
        auth: {
            user: { type: String, trim: true },
            pass: { type: String, trim: true }
        }
    },
    urlConnection: {type: String, trim: true }
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  jsonFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jsonFile' }],
  templates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'templates' }]
}

module.exports = mongoose.Schema(_gymSchema);
