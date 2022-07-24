const router = require("express").Router();
const { AUTH } = require("../models/user_model");
const { authentication, asyncHandlerWrapper, setViewHeader } = require("../../utils/utils.js");
const { getCompanies, getCompanyDetail } = require("../controllers/company_controller.js");

const view = "company";

router.route("/companies").get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getCompanies));

router.route("/company/:id").get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getCompanyDetail));

module.exports = router;
