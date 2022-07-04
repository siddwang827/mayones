const router = require('express').Router();
const { asyncHandlerWrapper, authentication } = require('../../utils/utils.js')
const multer = require('multer')
const {
    getResumePage,
    getResumeEditPage,
    uploadResume
} = require('../controllers/profile_controller')

const upload = multer({ dest: 'uploads/' })


router.route('/resume')
    .get(authentication(), asyncHandlerWrapper(getResumePage));

router.route('/resume/:id')
    .get(authentication(), asyncHandlerWrapper(getResumeEditPage));

router.route('/resume')
    .post(authentication(), upload.array('projectImage', 3), asyncHandlerWrapper(uploadResume));

module.exports = router