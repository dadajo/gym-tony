"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const fs =  require('fs');
const userSchema = require('../model/user-model');
const _ = require('lodash');

const _gym = require('../../gym/dao/gym-dao');

userSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    user
      .find(_query)
      .exec((err, todos) => {
        err ? reject(err)
          : resolve(todos);
      });
  });
}

userSchema.statics.createNew = (params) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(params)) {
      //console.log("NOt OBJECT ERROR");
      return reject(new TypeError('Todo is not a valid object.'));
    }
   
    //console.log("BEFORE findOneAndUpdate "+JSON.stringify(params));
    
    user.findOneAndUpdate(
        params.user.email,
        params.user,
        //{ $push: { replies: reply } },
        { upsert: true },
        (err, saved) => {
             if(err) reject(err)
              //console.log("ONTO findOneAndUpdate "+JSON.stringify(saved));
              userLinkToGym(params.id, saved);
              resolve(saved);
    });

  });
}

function userLinkToGym(id, params) {
   _gym.findOneAndUpdate(
        id,
        //params.user,
        { $addToSet: { users: params } },
        //{ upsert: true },
        (err, saved) => {
             if(err) reject(err)
             params.gyms.addToSet(saved);   
             params.save();
    });
}

userSchema.statics.removeById = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError('Id is not a valid string.'));
    }

    user
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
          : resolve();
      });
  });
}

userSchema.statics.upload = (file, data) => {
  return new Promise((resolve, reject) => {
    //console.log(data);

    if (!file) {
        //console.log(file);
        return reject(new TypeError('No file'))//resolve({"status":"mrr"});
    }
    //console.log(file);
    
    _gym.insertFile(file, data)
      .then(resp => {
        //console.log(resp);
        insertFromFile(file.path, data);//, resolve, reject);
        resolve(resp);
      })
      .catch(error => {
        console.log(error);
        reject(error)
      });
      
  });//end promise
}

function insertFromFile(file, id) {//, resolve, reject) {
  fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;
     
        var _data = JSON.parse(data);
        //console.log(_data.length);
        for (var i = 0, len = _data.length; i < len; i++) {

          user.findOneAndUpdate(
            //{"email":_data[i].email},
            {"id":_data[i].id},
            new user(_data[i]),
            { upsert: true },
            (err, userUpdated) => {
              if(err) console.log(err)//reject(err)

              if(userUpdated){

                setTimeout(() => {

                  _gym.findOneAndUpdate(
                    id,
                    { $addToSet: { users: userUpdated } },
                    (err, gymUpdated) => {
                        if(err) console.log(err)//reject(err)
                        
                        try {
                          userUpdated.gyms.addToSet(gymUpdated);
                          userUpdated.save();
                        }catch(error){
                          console.log(error);
                        }

                    });
            
                }, 100);
                
              }                 
            });            

        }

      /*
      user.collection.insertMany(JSON.parse(data), { ordered: false }, (err,result) => {
        if(err){
          console.log(JSON.stringify(err));
          console.error("error *insertFromFile*");
        }
          
        console.log('inserted-> '+ result);
        _gym.findOneAndUpdate(
            id,
            //params.user,
            //{ $addToSet: { users: result } },
            //{ upsert: true }, // upsert looks to find a Message with that id and if it doesn't exist creates the Message 
            (err, updated) => {
                if(err) console.log(err)

                //console.log("ONTO  _gym.findOneAndUpdate " + JSON.stringify(updated));
                for (var i = 0, len = arr.length; i < len; i++) {
                  someFn(arr[i]);
                }
                
        });
      });
      */      
    });
}

const user = mongoose.model('user', userSchema);

module.exports = user;
