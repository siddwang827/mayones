const router = require("express").Router();
const { AUTH } = require("../models/user_model");
const { authentication, asyncHandlerWrapper, setViewHeader } = require("../../utils/utils.js");
const { getJobs, getJobDetail } = require("../controllers/job_controller.js");

const view = "job";

router.route("/jobs").get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getJobs));

router.route("/job/:id").get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getJobDetail));

module.exports = router;
