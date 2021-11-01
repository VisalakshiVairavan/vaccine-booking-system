/* eslint-disable no-undef */
const expect = require('chai').expect;
const request = require('request');
const sinon = require('sinon');
const faker = require('faker');
const User = require('../src/models').user;

describe('User', function () {
  describe('GET API', function () {
    const url = 'http://localhost:5000/api/user';

    const stubValue = {
      uuid: faker.datatype.uuid(),
      name: faker.name.findName(),
      nric: faker.name.findName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    };
    sinon
      .stub(User, 'findAll')
      .returns(new Promise(resolve => resolve([stubValue])));

    it('returns status 200', function () {
      request(url, function (error, response) {
        expect(response.statusCode).to.equal(200);
      });
    });
  });
});
