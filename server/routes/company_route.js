const router = require('express').Router();
const { asyncHandlerWrapper } = require('../../utils/utils.js')

const { getAllCompanies,
    getCompanyDetail,
    createCompany,
    deleteCompany } = require('../controllers/company_controller.js')

router.route('/companies')
    .get(asyncHandlerWrapper(getAllCompanies))

router.route('/company/:id')
    .get(asyncHandlerWrapper(getCompanyDetail))

router.route('/company')
    .post(asyncHandlerWrapper(createCompany))

router.route('/company')
    .delete(asyncHandlerWrapper(deleteCompany))

module.exports = router