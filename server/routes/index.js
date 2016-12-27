"use strict";

const GymRoutes       = require('../api/gym/routes/gym-route');
const GymUserRoutes   = require('../api/user-gym/routes/user-route');
//const GymCampaignRoutes = require('../api/gym-campaign/routes/campaign-route');

module.exports = class Routes {
   static init(app, router) {
     
     GymRoutes.init(router);
     GymUserRoutes.init(router);
     //GymCampaignRoutes.init(router);

     app.use('/', router);
   }
}
