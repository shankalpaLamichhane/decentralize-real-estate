const express = require('express');
const {authorize,ADMIN,LOGGED_USER} = require('../../middlewares/auth');

const controller = require('../../controllers/user.controller');

const router = express.Router();

router
    .route('/')
        .get(authorize(ADMIN),controller.get)
        .post(controller.create);

module.exports = router;