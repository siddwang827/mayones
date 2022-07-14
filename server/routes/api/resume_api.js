const router = require('express').Router();
const { upload, asyncHandlerWrapper, authentication } = require('../../../utils/utils.js')
const {
    fetchResumeDetail,
    uploadResume,
    deleteResume,
    updateResume
} = require('../../controllers/profile_controller')

const resumeUploadMulter = upload.array('projectImage', 3)


router.route('/resume/:id')
    .get(authentication(), asyncHandlerWrapper(fetchResumeDetail))
    .delete(authentication(), asyncHandlerWrapper(deleteResume))
    .patch(authentication(), resumeUploadMulter, asyncHandlerWrapper(updateResume));

router.route('/resume')
    .post(authentication(), resumeUploadMulter, asyncHandlerWrapper(uploadResume))



// router.route('/resume/:id')

module.exports = router