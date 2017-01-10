"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const fs =  require('fs');
const userSchema = require('../model/user-model');
const _ = require('lodash');
const nodemailer = require('nodemailer');

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
   
    console.log("userSchema.statics.createNew ",params);
    
    user.findOneAndUpdate(
        params.user.email,
        params.user,
        //{ $push: { replies: reply } },
        { upsert: true },
        (err, saved) => {
             if(err) reject(err)
              console.log("user.findOneAndUpdate", saved);
              userLinkToGym(params.id, saved);
              resolve(saved);
    });

  });
}

function userLinkToGym(id, params) {
    console.log("user send bienvenido", params.email);
   _gym.findOneAndUpdate(
        id,
        //params.user,
        { $addToSet: { users: params } },
        //{ upsert: true },
        (err, saved) => {
             if(err) reject(err)
             params.gyms.addToSet(saved);   
             params.save();

             sendRegisteredConfirmation(saved.emailConfig, params.email);

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
  //console.log("insertFromFile", id);
  fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;

        console.log("Read file", data);

        let _data = JSON.parse(data);
        //console.log(_data.length);
        for (let i = 0, len = _data.length; i < len; i++) {
          
          user.findOne(
            {"id":_data[i].id},
            //_data[i],//new user(_data[i]),//
            //{ upsert: true },
            (err, userUpdated) => {
              if(err) console.log(err)//reject(err)
              
               console.log("-_- "+i, _data[i]);
              //console.log("user.findOneAndUpdate", userUpdated);
              
              if(!_.isNull(userUpdated)){

                
                //setTimeout(() => {
                    if(userUpdated){
                      userUpdated.lastViewed = _data[i].lastViewed;
                      userUpdated.save();
                      userLinkToGym(id, userUpdated);   
                    }
                  //}, 100);
                //userLinkToGym(id, userUpdated);
                
                /*
                setTimeout(() => {
                  
                  _gym.findOneAndUpdate(
                    id,
                    { $addToSet: { users: userUpdated } },
                    (err, gymUpdated) => {
                        if(err) console.log(err)//reject(err)
                        
                        console.log("_gym.findOneAndUpdate");
                        
                        try {
                          userUpdated.gyms.addToSet(gymUpdated);
                          userUpdated.save();
                        }catch(error){
                          console.log("Error try user.addToSet", error);
                        }

                    });
                    
            
                }, 100);
                */
              }else{
                console.log("before new user... ", _data[i]);
                let userToLink = new user(_data[i]);    
                userToLink.save((err, saved) => {
                  console.log("userToLink ", saved);
                  //setTimeout(() => {
                    if(saved)
                      userLinkToGym(id, saved);   
                  //}, 100);
                });
              }   
              //console.log("track", userToLink)

              

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

function sendRegisteredConfirmation(emailConfig, to){
  var transporter = nodemailer.createTransport(emailConfig.smtpConfig);

  var mailOptions = {
      from: '"Gym Tony 👥" <'+ emailConfig.smtpConfig.auth.user+'>', // sender address
      to: to,
      subject: '¡Bienvendo!', // Subject line                        
      html: '<b>Bienvenido a nuestro sistema de recoñocimiento -> 🐴</b>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if(error){
          console.log("Error sendind email: ",error);
      }
      console.log('Message sent: ', info);
  });  
}

const user = mongoose.model('user', userSchema);

module.exports = user;
