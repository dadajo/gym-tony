"use strict";

const mongoose = require('mongoose');
const Agenda = require('agenda');
const dbConst = require('../constants/db.json');

module.exports = class DBConfig {
    static init() {
      const URL = (process.env.NODE_ENV === 'production') ? process.env.MONGOHQ_URL || 
                                                            process.env.MONGOLAB_URI
                                                          : dbConst.localhost;

      mongoose.connect(URL);
      const agenda = new Agenda({db: {address: URL, collection: "jobs"}});
      mongoose.connection.on('error', console.error.bind(console, 'An error ocurred with the DB connection: '));
    }
};
