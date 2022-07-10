const router = require('express').Router();
const { upload, asyncHandlerWrapper, authentication, setViewHeader } = require('../../utils/utils.js')
const { AUTH } = require('../models/user_model')
const { getCompanyManagePage,
    createCompanyDetail,
    getJobManagePage,
    createJobDetail,
    getApplicationsePage } = require('../controllers/manage_controller.js')




router.route('/manage/company')
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getCompanyManagePage))

router.route('/manage/company')
    .post(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(createCompanyDetail))


router.route('/manage/job')
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getJobManagePage))

router.route('/manage/job')
    .post(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(createJobDetail))


router.route('/manage/applications')
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getApplicationsePage))





module.exports = router;