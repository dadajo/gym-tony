"use strict";

const gymDAO = require('../dao/gym-dao');

module.exports = class gymController {
  static getAll(req, res) {
    gymDAO
      .getAll()
      .then(gym => res.status(200).json(gym))
      .catch(error => res.status(400).json(error));
  }

  static createNew(req, res) {
    let _gym = req.body;
    
    gymDAO
      .createNew(_gym)
      .then(gym => res.status(201).json(gym))
      .catch(error => res.status(400).json(error));
  }

  static removeById(req, res) {
    let _id = req.params.id;

    gymDAO
      .removeById(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }

  static firstRun(){
    gymDAO.firstRun();
  }
}
