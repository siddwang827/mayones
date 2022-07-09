const view = "job"
const router = require('express').Router();
const { upload, authentication, asyncHandlerWrapper, setViewHeader } = require('../../utils/utils.js')
const { AUTH } = require('../models/user_model')

const {
    getJobs,
    getJobDetail,
    createJob,
    deleteJob } = require('../controllers/job_controller.js')

const jobOpeningMulter = upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'logoImage', maxCount: 1 },
    { name: 'otherImages', maxCount: 5 },
])


router.route('/jobs')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getJobs))


router.route('/job/:id')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getJobDetail));

router.route('/job')
    .post(authentication(AUTH.required), jobOpeningMulter, asyncHandlerWrapper(createJob));

router.route('/job')
    .delete(authentication(AUTH.required), asyncHandlerWrapper(deleteJob));


module.exports = router;

