const router = require('express').Router();
const { upload, asyncHandlerWrapper, authentication } = require('../../../utils/utils.js')
const {
    fetchResumeDetail,
    uploadResume,
    deleteResume,
    updateResume,
    deleteSkill,
    deleteExperience,
    deleteProject,
    deleteEducation,
} = require('../../controllers/profile_controller')

const resumeUploadMulter = upload.array('projectImage', 3)


router.route('/resume/:id')
    .get(authentication(), asyncHandlerWrapper(fetchResumeDetail))
    .delete(authentication(), asyncHandlerWrapper(deleteResume))
    .patch(authentication(), resumeUploadMulter, asyncHandlerWrapper(updateResume));

router.route('/resume')
    .post(authentication(), resumeUploadMulter, asyncHandlerWrapper(uploadResume))

router.route('/skill/:id')
    .delete(authentication(), asyncHandlerWrapper(deleteSkill))

router.route('/experience/:id')
    .delete(authentication(), asyncHandlerWrapper(deleteExperience))

router.route('/project/:id')
    .delete(authentication(), asyncHandlerWrapper(deleteProject))

router.route('/education/:id')
    .delete(authentication(), asyncHandlerWrapper(deleteEducation))


// router.route('/resume/:id')

module.exports = router