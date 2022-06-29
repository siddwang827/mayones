const router = require('express').Router();
const { authentication, asyncHandlerWrapper } = require('../../utils/utils.js')

const { getAllJobs,
    getJobDetail,
    createJob,
    deleteJob } = require('../controllers/job_controller.js')


router.route('/jobs')
    .get(authentication(), asyncHandlerWrapper(getAllJobs));

router.route('/job/:id')
    .get(authentication(), asyncHandlerWrapper(getJobDetail));

router.route('/job')
    .post(asyncHandlerWrapper(createJob));

router.route('/job')
    .delete(asyncHandlerWrapper(deleteJob));


module.exports = router;

