const sinon = require('sinon');
var assert = require('chai').assert
const jwt = require('jsonwebtoken')
const jwtService = require('../api/services/jwtService');
sinon.stub(jwt,'verify').returns({a:'b'});

describe('JWT Test', () => {
    it('should work', () => {
        assert.notEqual(jwtService.verifyToken('token'),null);
    })
})