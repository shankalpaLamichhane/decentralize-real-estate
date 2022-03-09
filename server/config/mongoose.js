const mongoose = require('mongoose');
const logger = require('./logger');
const {mongo,env} = require('./context');

mongoose.connection.on('error',err => {
    logger.error(`MongoDB connection error : ${err}`)
    process.exit(-1);
});

if (env == 'development'){
    mongoose.set('debug',true);
}

/*
connect to mongo db
*/
exports.connect = () => {
    mongoose    
        .connect(mongo.uri,{
            useCreateIndex: true,
            keepAlive: 1,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => console.log('MongoDB connected...'));
    return mongoose.connection;
};