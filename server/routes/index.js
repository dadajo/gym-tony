"use strict";

const GymRoutes = require('../api/gym/routes/gym-route');
const GymCampaignRoutes = require('../api/gym-campaign/routes/campaign-route');
const GymUserRoutes = require('../api/user-gym/routes/user-route');

module.exports = class Routes {
   static init(app, router) {
     
     GymRoutes.init(router);
     GymCampaignRoutes.init(router);
     GymUserRoutes.init(router);

     app.use('/', router);
   }
}
