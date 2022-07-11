const router = require('express').Router();
const { upload, authentication, asyncHandlerWrapper, setViewHeader } = require('../../utils/utils.js')
const { AUTH } = require('../models/user_model')
const { getCompanies,
    getCompanyDetail,
    createCompany,
    deleteCompany } = require('../controllers/company_controller.js')
const view = "company"


const jobOpeningMulter = upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'logoImage', maxCount: 1 },
    { name: 'otherImages', maxCount: 5 },
])


router.route('/companies')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getCompanies))

router.route('/company/:id')
    .get(authentication(AUTH.nonRequired), setViewHeader(view), asyncHandlerWrapper(getCompanyDetail))

router.route('/company')
    .post(authentication(AUTH.required), jobOpeningMulter, asyncHandlerWrapper(createCompany))

router.route('/company')
    .delete(authentication(AUTH.required), asyncHandlerWrapper(deleteCompany))

module.exports = router