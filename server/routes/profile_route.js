const router = require('express').Router();
const { asyncHandlerWrapper, authentication } = require('../../utils/utils.js')
const multer = require('multer')
const {
    getProfilePage,
    getResumePage,
    getResumeEditPage,
    uploadResume
} = require('../controllers/profile_controller')

const upload = multer({ dest: 'uploads/' })

router.route('/profile')
    .get(authentication(), asyncHandlerWrapper(getProfilePage));

router.route('/resume')
    .get(authentication(), asyncHandlerWrapper(getResumePage));

router.route('/resumeEdit')
    .get(authentication(), asyncHandlerWrapper(getResumeEditPage));

router.route('/resume')
    .post(authentication(), upload.array('projectImage', 3), asyncHandlerWrapper(uploadResume));

module.exports = router