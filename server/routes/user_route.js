const router = require("express").Router();
const { AUTH } = require("../models/user_model");
const { asyncHandlerWrapper, authentication } = require("../../utils/utils.js");
const { getSignUpPage, getSignInPage, logout } = require("../controllers/user_controller");

router.route(["/employer/signup", "/employee/signup"]).get(asyncHandlerWrapper(getSignUpPage));

router.route(["/employer/signin", "/employee/signin"]).get(asyncHandlerWrapper(getSignInPage));

router.route("/logout").get(authentication(AUTH.required), asyncHandlerWrapper(logout));

module.exports = router;
