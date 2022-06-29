const router = require('express').Router();
const { authentication, asyncHandlerWrapper } = require('../../utils/utils.js')

const { getAllCompanies,
    getCompanyDetail,
    createCompany,
    deleteCompany } = require('../controllers/company_controller.js')

router.route('/companies')
    .get(authentication(), asyncHandlerWrapper(getAllCompanies))

router.route('/company/:id')
    .get(authentication(), asyncHandlerWrapper(getCompanyDetail))

router.route('/company')
    .post(authentication(), asyncHandlerWrapper(createCompany))

router.route('/company')
    .delete(asyncHandlerWrapper(deleteCompany))

module.exports = router