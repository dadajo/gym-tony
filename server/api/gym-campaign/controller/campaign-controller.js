"use strict";

const campaignDAO = require('../dao/campaign-dao');

module.exports = class campaignController {
  
  /*
  static getAll(req, res) {
    campaignDAO
      .getAll()
      .then(campaign => res.status(200).json(campaign))
      .catch(error => res.status(400).json(error));
  }
  */

  static uploadGymData(req, res) {
    let _campaign = req.body;

    campaignDAO
      .uploadGymData(_campaign)
      .then(campaign => res.status(201).json(campaign))
      .catch(error => res.status(400).json(error));
  }

  static removeById(req, res) {
    let _id = req.params.id;

    campaignDAO
      .removeById(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
