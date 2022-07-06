const router = require('express').Router();
const { asyncHandlerWrapper, authentication } = require('../../../utils/utils.js')
const multer = require('multer')
const {
    fetchResumeDetail,
    uploadResume,
    deleteResume
} = require('../../controllers/profile_controller')


const upload = multer({ dest: 'uploads/' })


router.route('/resume/:id')
    .get(authentication(), asyncHandlerWrapper(fetchResumeDetail));


router.route('/resume')
    .post(authentication(), upload.array('projectImage', 3), asyncHandlerWrapper(uploadResume));


router.route('/resume')
    .delete(authentication(), asyncHandlerWrapper(deleteResume));

module.exports = router