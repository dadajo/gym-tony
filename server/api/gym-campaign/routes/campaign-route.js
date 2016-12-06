"use strict";

const campaignController = require('../controller/campaign-controller');

module.exports = class campaignRoutes {
  static init(router) {
    router
      .route('/api/campaign')
      //.get(campaignController.getAll)
      .post(campaignController.uploadGymData);

    router
      .route('/api/campaign/:id')
      .delete(campaignController.removeById);
  }
}
