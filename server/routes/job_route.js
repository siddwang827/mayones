const view = "job"
const router = require('express').Router();
const { upload, authentication, asyncHandlerWrapper, setViewHeader } = require('../../utils/utils.js')
const { AUTH } = require('../models/user_model')

const {
    getJobs,
    getJobDetail,
} = require('../controllers/job_controller.js')


router.route('/jobs')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getJobs))


router.route('/job/:id')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getJobDetail));

module.exports = router;

