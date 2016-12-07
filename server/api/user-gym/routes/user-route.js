"use strict";

const userController = require('../controller/user-controller');

module.exports = class userRoutes {
  static init(router) {
    router
      .route('/api/user')
      .get(userController.getAll)
      .post(userController.createNew);

    router
      .route('/api/user/:id')
      .delete(userController.removeById);
  }
}
