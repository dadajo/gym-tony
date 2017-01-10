"use strict";

const nodemailer = require('nodemailer');
const fs = require('fs');
const Agenda = require('agenda');
const dbConst = require('../constants/db.json');
const _ = require('lodash');

var http = require("http");
 setInterval(() => {
          http.get("https://gym-tony.herokuapp.com/");
      }, 300000); // every 5 minutes (300000)

const gym = require('../api/gym/dao/gym-dao');
const user_gym = require('../api/user-gym/dao/user-dao');


module.exports = class AgendaConfig {
    static init() {
      const URL = (process.env.NODE_ENV === 'production') ? process.env.MONGOHQ_URL || 
                                                            process.env.MONGOLAB_URI
                                                          : dbConst.localhost;

      const agenda = new Agenda({db: {address: URL, collection: "jobs"}});
      
      agenda.define('send emails', {priority: 'high', concurrency: 10}, (job, done) => {
        //var data = job.attrs.data;

        var d = new Date();
            d.setMonth(d.getMonth() - 2);
        
        gym
        .findOne({
            id:'blume'
        })
        .populate({
            path: 'users',
            match: { lastViewed: { $lt: d } }
        })
        .exec((err, result) => {
            if(err) { 
                console.log(err); 
            } else {
                if(_.isObject(result.users)){
                    var transporter = nodemailer.createTransport(result.emailConfig.smtpConfig);
                
                    fs.readFile(__dirname + "/template/index.htm", (error, html) => {
                        var mailOptions = {
                            from: '"Gym Tony 👥" <'+ result.emailConfig.smtpConfig.auth.user+'>', // sender address
                            to: undefined,
                            subject: '¡Ofertón!', // Subject line                        
                            html: html//'<b>Hello world 🐴</b>' // html body
                        };

                        
                        for(var _to in result.users) {
                            mailOptions.to = result.users[_to].email;
                        
                            transporter.sendMail(mailOptions, (error, info) => {
                                if(error){
                                    console.log("Error sendind email: ",error);
                                }
                                console.log('Message sent: ', info);
                            });
                        }                    
                        
                    });
                }   
            } 
        });

        //
        /*
        parent
            .findOne(_query)
            .populate({
                path: 'devices',
                match: { android_id: data.android_id}
            })
            .exec((err, result) => {

            });
            */

        });
        
        /*
        agenda.on('ready', () => {
            agenda.schedule('in 2 minutes', 'test');
            agenda.start();
        });
        */
        /*
        agenda.on('ready', () => {
            var weeklyReport = agenda.create('send email report', {to: 'uiktiomasfeliz@gmail.com, joseantoniocamposgonzalez@gmail.com, damian_8_8@hotmail.com'});
            weeklyReport.repeatEvery('1.5 minutes').save();
            agenda.start();
        });
        */

        agenda.on('ready', () => {
            //var weeklyReport = agenda.create('send email report');
            //weeklyReport.repeatEvery('one day').save();
            agenda.every('one day at 06pm', 'send emails');
            agenda.start();
            //var weeklyReport = agenda.create('send email report');
            //weeklyReport.repeatEvery('5 minutes').save();
        });
    }
};
