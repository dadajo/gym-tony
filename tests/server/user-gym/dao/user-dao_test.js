"use strict";

const mongoose = require('mongoose');
const userDAO = require(process.cwd() + '/server/api/user-gym/dao/user-dao');
const expect = require('chai').expect;
const setupMongoose = require('../../_helpers/db').setupMongoose;

describe('userDAO', () => {
  before(() => {
    setupMongoose(mongoose);
  });

  afterEach(() => {
    userDAO.remove();
  })

  describe('getAll', () => {

  })

  describe('createNew', () => {

  })

  describe('removeById', () => {

  })
})
