const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('../errors/api-error');
const {env} = require('../../config/context');

const handler = (err,req,res,next) => {
    const response = {
        code : err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack,
    };

    if (env !== 'development') {
        delete response.stack;
    }

    res.status(err.status);
    res.json(response);
};
exports.handler = handler;

