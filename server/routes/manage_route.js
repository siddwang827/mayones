const router = require("express").Router();
const { AUTH } = require("../models/user_model");
const { upload, asyncHandlerWrapper, authentication, setViewHeader } = require("../../utils/utils.js");
const {
    getCompanyManagePage,
    createCompanyDetail,
    getJobManagePage,
    createJobDetail,
    getApplicationsManagePage,
    checkUserResume,
    inviteInterview,
    getJobOpeningEidtPage,
} = require("../controllers/manage_controller.js");

const companyMulter = upload.fields([{ name: "logoImage" }, { name: "bannerImage" }, { name: "otherImages", maxCount: 5 }]);
const jobMulter = upload.none();

router.route("/manage/job/:id").get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getJobOpeningEidtPage));

router
    .route("/manage/job")
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getJobManagePage))
    .post(authentication(AUTH.required), jobMulter, asyncHandlerWrapper(createJobDetail));

router
    .route("/manage/company")
    .get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getCompanyManagePage))
    .post(authentication(AUTH.required), companyMulter, asyncHandlerWrapper(createCompanyDetail));

router.route("/manage/applications").get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getApplicationsManagePage));

router.route("/manage/check-resume").post(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(checkUserResume));

router.route("/manage/invite").post(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(inviteInterview));

module.exports = router;
