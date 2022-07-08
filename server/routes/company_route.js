const router = require('express').Router();
const { authentication, asyncHandlerWrapper, setViewHeader } = require('../../utils/utils.js')
const { AUTH } = require('../models/user_model')
const { getCompanies,
    getCompanyDetail,
    createCompany,
    deleteCompany } = require('../controllers/company_controller.js')
const view = "company"


router.route('/companies')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getCompanies))

router.route('/company/:id')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getCompanyDetail))

router.route('/company')
    .post(authentication(AUTH.required), asyncHandlerWrapper(createCompany))

router.route('/company')
    .delete(authentication(AUTH.required), asyncHandlerWrapper(deleteCompany))

module.exports = router