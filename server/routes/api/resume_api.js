const router = require('express').Router();
const { upload, asyncHandlerWrapper, authentication } = require('../../../utils/utils.js')
const multer = require('multer')
const {
    fetchResumeDetail,
    uploadResume,
    deleteResume
} = require('../../controllers/profile_controller')

const resumeUploadMulter = upload.array('projectImage', 3)


router.route('/resume/:id')
    .get(authentication(), asyncHandlerWrapper(fetchResumeDetail))
    .delete(authentication(), asyncHandlerWrapper(deleteResume));

router.route('/resume')
    .post(authentication(), resumeUploadMulter, asyncHandlerWrapper(uploadResume))



// router.route('/resume/:id')

module.exports = router