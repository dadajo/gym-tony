"use strict";

const userDAO = require('../dao/user-dao');

module.exports = class userController {
  static getAll(req, res) {
    userDAO
      .getAll()
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }

  static createNew(req, res) {
    let _user = req.body;

    userDAO
      .createNew(_user)
      .then(user => res.status(201).json(user))
      .catch(error => res.status(400).json(error));
  }

  static upload(req, res) {
    let _gymFile = req.file;
    let _gymObj = req.body;

    userDAO
      .upload(_gymFile, _gymObj)
      .then(gym => res.status(201).json(gym))
      .catch(error => res.status(400).json(error));
  }

  static removeById(req, res) {
    let _id = req.params.id;

    userDAO
      .removeById(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
