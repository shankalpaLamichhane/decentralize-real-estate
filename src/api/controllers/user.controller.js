const httpStatus = require('http-status');
const {omit} = require('lodash');
const User = require('../models/user.model');

exports.load = async (req,res,next,id) => {
    try{
        const user = await User.get(id);
        req.locals = {user};
        return next();
    }catch(error){
        return next(error);
    }
};

exports.get = (req,res) => res.json(req.locals.user.transform());

exports.loggedIn = (req,res) => res.json(req.user.transform());

exports.create = async (req,res,next) => {
    try{
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(httpStatus.CREATED);
        res.json(savedUser.transform());
    }catch(error) {
    }
}

exports.get = (req,res) => res.json(req.locals.user.transform());

