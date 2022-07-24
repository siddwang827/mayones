const router = require("express").Router();
const { AUTH } = require("../../models/user_model");
const { asyncHandlerWrapper, authentication } = require("../../../utils/utils.js");
const { signIn, signUp, logout } = require("../../controllers/user_controller");

router.route("/signup").post(asyncHandlerWrapper(signUp));

router.route("/signin").post(asyncHandlerWrapper(signIn));

router.route("/logout").get(authentication(AUTH.required), asyncHandlerWrapper(logout));

module.exports = router;
