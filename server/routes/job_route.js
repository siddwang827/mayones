const router = require('express').Router();
const { authentication, asyncHandlerWrapper, setViewHeader } = require('../../utils/utils.js')
const {
    getJobs,
    getJobDetail,
    createJob,
    deleteJob } = require('../controllers/job_controller.js')
const { AUTH } = require('../models/user_model')
const view = "job"

router.route('/jobs')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getJobs))


router.route('/job/:id')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getJobDetail));

router.route('/job')
    .post(authentication(AUTH.required), asyncHandlerWrapper(createJob));

router.route('/job')
    .delete(authentication(AUTH.required), asyncHandlerWrapper(deleteJob));


module.exports = router;

