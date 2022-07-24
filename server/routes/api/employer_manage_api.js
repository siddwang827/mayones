const router = require("express").Router();
const { AUTH } = require("../../models/user_model");
const { upload, authentication, asyncHandlerWrapper, setViewHeader } = require("../../../utils/utils.js");
const { getPosition, getJobTextareaValue } = require("../../controllers/manage_controller.js");
const { createCompanyDetail, createJobDetail, checkUserResume, inviteInterview } = require("../../controllers/manage_controller.js");

const companyMulter = upload.fields([{ name: "logoImage" }, { name: "bannerImage" }, { name: "otherImages", maxCount: 5 }]);
const jobMulter = upload.none();

router.route("/positions").get(asyncHandlerWrapper(getPosition));

router.route("/job-textarea").get(asyncHandlerWrapper(getJobTextareaValue));

router.route("/manage/company").post(authentication(AUTH.required), companyMulter, asyncHandlerWrapper(createCompanyDetail));

router.route("/manage/job").post(authentication(AUTH.required), jobMulter, asyncHandlerWrapper(createJobDetail));

router.route("/manage/check-resume").post(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(checkUserResume));

router.route("/manage/invite").post(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(inviteInterview));

module.exports = router;
