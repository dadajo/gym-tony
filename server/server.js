'use strict';

if (process.env.NODE_ENV === 'production')
    require('newrelic');

const PORT = process.env.PORT || 3333;

const os = require('os');
const http = require('http');
const express = require('express');
//const fileUpload = require('express-fileupload');
//const multer = require('multer');
const RoutesConfig = require('./config/routes.conf');
const DBConfig = require('./config/db.conf');
const Routes = require('./routes/index');

const app = express();

//app.use(fileUpload());
//app.use(multer({ dest: './uploads/'}));

RoutesConfig.init(app);
DBConfig.init();
Routes.init(app, express.Router());

http.createServer(app)
    .listen(PORT, () => {
      console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
      console.log(`enviroment: ${process.env.NODE_ENV}`);
    });
