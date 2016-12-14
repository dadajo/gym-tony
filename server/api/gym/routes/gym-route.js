"use strict";

const gymController = require('../controller/gym-controller');

module.exports = class gymRoutes {
  static init(router) {
    
    router
      .route('/api/gym')
      .get(gymController.getAll)
      .post(gymController.createNew);

    router
      .route('/api/gym/:id')
      .delete(gymController.removeById);

    gymController.firstRun();
  }
}
