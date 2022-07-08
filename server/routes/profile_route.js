const router = require('express').Router();
const { asyncHandlerWrapper, authentication, setViewHeader } = require('../../utils/utils.js')
const multer = require('multer')
const { getAllFollows } = require('../controllers/follow_controller.js')
const {
    getResumePage,
    getResumeEditPage,
} = require('../controllers/profile_controller')
const { AUTH } = require('../models/user_model')




router.route('/resume/:id')
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getResumeEditPage));

router.route('/resumes')
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getResumePage));

router.route('/follows')
    .get(authentication(AUTH.nonRequired), setViewHeader(), asyncHandlerWrapper(getAllFollows));

module.exports = router