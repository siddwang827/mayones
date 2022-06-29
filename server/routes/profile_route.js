const router = require('express').Router();
const { asyncHandlerWrapper, authentication } = require('../../utils/utils.js')

const {
    getResumePage,
    getResumeEditPage,
    uploadResume
} = require('../controllers/profile_controller')


router.route('/resume')
    .get(authentication(), asyncHandlerWrapper(getResumePage));

router.route('/resumeEdit')
    .get(authentication(), asyncHandlerWrapper(getResumeEditPage));

router.route('/resume')
    .post(authentication(), asyncHandlerWrapper(uploadResume));

module.exports = router