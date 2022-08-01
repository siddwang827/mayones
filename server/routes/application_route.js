const router = require("express").Router();
const { AUTH } = require("../models/user_model");
const { asyncHandlerWrapper, authentication, setViewHeader } = require("../../utils/utils.js");
const { getApplicationPage, getApplicationListPage } = require("../controllers/application_controller.js");

router.route("/application/:jobId").get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getApplicationPage));

router.route("/applications").get(authentication(AUTH.required), setViewHeader(), asyncHandlerWrapper(getApplicationListPage));

module.exports = router;
