"use strict";

const nodemailer = require('nodemailer');

const gym = require('../api/gym/dao/gym-dao');

module.exports = class MailerConfig {
    static init() {
        const transporter = nodemailer.createTransport(result.emailConfig.smtpConfig);
    }
};
