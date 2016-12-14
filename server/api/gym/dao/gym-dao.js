"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');
const gymSchema = require('../model/gym-model');
const jsonFileSchema = require('../model/jsonFile-model');
const templatesSchema = require('../model/templates-model');
 
gymSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    gym
      .find(_query)
      .exec((err, todos) => {
        err ? reject(err)
          : resolve(todos);
      });
  });
}

gymSchema.statics.createNew = (data) => {
  return new Promise((resolve, reject) => {
    
    //console.log("gymSchema.statics.createNew "+JSON.stringify(data));

    if (!_.isObject(data)) {
      return resolve({'error':'gym is not a valid object.'});
    }

    //console.log("mrr");
   
    //try{
      let _something = new gym(data);

       _something.save((err, saved) => {
          err ? resolve(err)
            : resolve(saved);
        });
    //}catch(err){
      //console.log(err)
    //}
    
    //console.log("brr");

   
  });
}

gymSchema.statics.insertFile = (file, id) => {
  return new Promise((resolve, reject) => {
    let _file = new jsonFile({name: file.filename, ubicated: file.path});

    _file.save((err, saved) => {
      if(err)
        reject(err)
        
         gym.findOneAndUpdate(
            id,
            //params.user,
            { $addToSet: { jsonFiles: saved } },
            //{ upsert: true }, 
            (err, updated) => {
                if(err) reject(err)

                //console.log("ONTO  _gym.findOneAndUpdate " + JSON.stringify(updated));
                resolve({"data":updated,"error": 0});
        });

        //
    });
  });//end promise

}

gymSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    gym
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
}

gymSchema.statics.firstRun = () => {
    //todo a pelo
    gym.findOneAndUpdate(
        {"id":"blume"},
        {"id":"blume", "name":"Blume"},
        { upsert: true },
        (err, updated) => {
            
    });
}

gymSchema.statics.getGym = () => {
  return gym;
}

const gym = mongoose.model('gym', gymSchema);
const jsonFile = mongoose.model('jsonFile', jsonFileSchema);
const templates = mongoose.model('templates', templatesSchema);

module.exports = gym;
