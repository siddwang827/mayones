const router = require('express').Router();
const { asyncHandlerWrapper, authentication } = require('../../utils/utils.js')

const {
    getApplicationPage,
    sendApplication,
    getApplicationListPage
} = require('../controllers/application_controller.js')


router.route('/application/:jobId')
    .get(authentication(), asyncHandlerWrapper(getApplicationPage));

router.route('/application/')
    .post(authentication(), asyncHandlerWrapper(sendApplication));

router.route('/applications')
    .get(authentication(), asyncHandlerWrapper(getApplicationListPage));



module.exports = router;