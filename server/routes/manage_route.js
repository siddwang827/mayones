const router = require('express').Router();
const { upload, asyncHandlerWrapper, authentication, setViewHeader } = require('../../utils/utils.js')
const { AUTH } = require('../models/user_model')
const { getCompanyManagePage,
    createCompanyDetail,
    getJobManagePage,
    createJobDetail,
    getApplicationsManagePage,
    checkUserResume,
    getPosition,
    inviteInterview } = require('../controllers/manage_controller.js')

const companyMulter = upload.fields([{ name: "logoImage" }, { name: "bannerImage" }, { name: "otherImages", maxCount: 5 }])
const jobMulter = upload.none()


router.route('/manage/company')
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getCompanyManagePage))

router.route('/manage/company')
    .post(authentication(AUTH.required), companyMulter, asyncHandlerWrapper(createCompanyDetail))


router.route('/manage/job')
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getJobManagePage))

router.route('/manage/job')
    .post(authentication(AUTH.required), jobMulter, asyncHandlerWrapper(createJobDetail))


router.route('/manage/applications')
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getApplicationsManagePage))

router.route('/manage/check-resume')
    .post(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(checkUserResume))

router.route('/manage/invite')
    .post(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(inviteInterview))

router.route('/api/1.0/positions')
    .get(asyncHandlerWrapper(getPosition))


module.exports = router;