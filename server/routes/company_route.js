const router = require('express').Router();
const { authentication, asyncHandlerWrapper } = require('../../utils/utils.js')

const { getCompanies,
    getCompanyDetail,
    createCompany,
    deleteCompany } = require('../controllers/company_controller.js')

router.route('/companies')
    .get(asyncHandlerWrapper(getCompanies))

router.route('/company/:id')
    .get(asyncHandlerWrapper(getCompanyDetail))

router.route('/company')
    .post(authentication(), asyncHandlerWrapper(createCompany))

router.route('/company')
    .delete(asyncHandlerWrapper(deleteCompany))

module.exports = router