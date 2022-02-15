const mongoose = require('mongoose');
const httpStatus = require('http-status');
const {omitBy,isNil} = require('lodash');
const bcrypt = require('bcryptjs');
// use diff as deprecated
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../errors/api-error');
const {env,jwtSecret,jwtExpirationInterval} = require('../../config/context');

const roles = ['user','admin'];

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128,
    },
    name: {
        type:String,
        maxlength: 128,
        index: true,
        trim: true,
    },
    services: {
        facebook: String,
        google: String,
    },
    role: {
        type: String,
        enum: roles,
        default: 'user',
    },
    picture: {
        type: String,
        trim: true,
    },
},{
    timestamps: true,
});

userSchema.pre('save',async function save(next){
    try{
        if (!this.isModified('password')) return next();
        const rounds = env === 'test' ? 1 : 10;
        const hash = await bcrypt.hash(this.password,rounds);
        this.password = hash;
        return next();
    }catch(error){
        return next(error);
    }
});

userSchema.method({
    transform(){
        const transformed = {};
        const fields = ['id','name','email','picture','role','createdAt'];
        fields.forEach(field => {
            transformed[field] = this[field];
        });
        return transformed;
    }
})

module.exports = mongoose.model('User',userSchema);