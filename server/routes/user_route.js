const router = require("express").Router();
const { AUTH } = require("../models/user_model");
const { asyncHandlerWrapper } = require("../../utils/utils.js");
const { getSignUpPage, getSignInPage } = require("../controllers/user_controller");

router.route(["/employer/signup", "/employee/signup"]).get(asyncHandlerWrapper(getSignUpPage));

router.route(["/employer/signin", "/employee/signin"]).get(asyncHandlerWrapper(getSignInPage));

module.exports = router;
