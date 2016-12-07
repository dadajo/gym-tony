"use strict";
const multer  = require('multer')

const upload = multer({ dest: 'uploads/' })
const gymController = require('../controller/gym-controller');

module.exports = class gymRoutes {
  static init(router) {
    
    router
      .route('/api/gym')
      .get(gymController.getAll)
      .post(gymController.createNew);

    router
      .route('/api/gym/upload')
      .post(upload.single('file'), gymController.upload);

    router
      .route('/api/gym/:id')
      .delete(gymController.removeById);
  }
}
