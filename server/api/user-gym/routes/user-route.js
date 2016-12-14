"use strict";
const multer  = require('multer')

const upload = multer({ dest: 'uploads/databases', limits: {
       fields: 1,
       files: 1,
       fileSize: 512000
    } });

const userController = require('../controller/user-controller');

module.exports = class userRoutes {
  static init(router) {
    router
      .route('/api/user')
      .get(userController.getAll)
      .post(userController.createNew);
    
    router
      .route('/api/upload')
      .post(upload.single('file'), userController.upload);

    router
      .route('/api/user/:id')
      .delete(userController.removeById);
  }
}
