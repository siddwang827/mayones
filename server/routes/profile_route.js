const router = require("express").Router();
const { AUTH } = require("../models/user_model");
const { asyncHandlerWrapper, authentication, setViewHeader } = require("../../utils/utils.js");
const { getAllFollows } = require("../controllers/follow_controller.js");
const { getResumePage, getResumeEditPage } = require("../controllers/profile_controller");

router.route("/resume/:id").get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getResumeEditPage));

router.route("/resumes").get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getResumePage));

router.route("/follows").get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getAllFollows));

module.exports = router;
