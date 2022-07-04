const router = require('express').Router();
const { authentication, asyncHandlerWrapper } = require('../../utils/utils.js')

const {
    getJobDetail,
    createJob,
    deleteJob } = require('../controllers/job_controller.js')


router.route('/job/:id')
    .get(asyncHandlerWrapper(getJobDetail));

router.route('/job')
    .post(authentication(), asyncHandlerWrapper(createJob));

router.route('/job')
    .delete(authentication(), asyncHandlerWrapper(deleteJob));


module.exports = router;

