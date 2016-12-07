"use strict";

const mongoose = require('mongoose');
//const _gymSchema = require('../../gym/model/gym-model');

const _jsonFileSchema = {
  //id: {type: Number, default: 0, required: true},
  name: {type: String, required: true, trim: true},
  ubicated: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  //gym: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gym' }]

}
/*
var entitySchema = mongoose.Schema({
    testvalue: {type: String}
});

entitySchema.pre('save', (next) => {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, (error, counter) =>   {
        if(error)
            return next(error);
        doc.testvalue = counter.seq;
        next();
    });
});
*/
module.exports = mongoose.Schema(_jsonFileSchema);
