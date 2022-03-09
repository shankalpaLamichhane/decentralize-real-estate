const httpStatus = require('http-status');
const moment = require('moment-timezone');
const {omit} = require('lodash');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const {jwtExpirationInterval} = require('../../config/context');
const APIError = require('../errors/api-error');

function generateTokenResponse(user,accessToken) {
    console.log('1-------------------------------------------------------------------')

    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user).token;
    console.log('2-----------------------------------------------------------------')
    const expiresIn = moment().add(jwtExpirationInterval,'minutes');
    return {
        tokenType,
        accessToken,
        refreshToken,
        expiresIn,
    }
}


exports.register = async (req, res, next) => {
  try {
    const userData = omit(req.body, 'role');
    const user = await new User(userData).save();
    console.log('23124234234CREGISTERED USER IS ',user);
    // const userTransformed = user.transform();
    // console.log('transformed USER IS ',userTransformed);
    const token = generateTokenResponse(user, user.token());
    res.status(httpStatus.CREATED);
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next((error));
  }
};


exports.login = async (req, res, next) => {
    try {
      const { user, accessToken } = await User.findAndGenerateToken(req.body);
      const token = generateTokenResponse(user, accessToken);
      const userTransformed = user.transform();
      return res.json({ token, user: userTransformed });
    } catch (error) {
      return next(error);
    }
  };
  