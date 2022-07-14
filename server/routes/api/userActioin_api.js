const router = require('express').Router();
const { asyncHandlerWrapper, authentication } = require('../../../utils/utils.js')
const { AUTH } = require('../../models/user_model')
const {
    addFollow,
    unFollowJob,
    unFollowCompany
} = require('../../controllers/follow_controller.js')

const { sendApplication, updateApplication, cancelApplication } = require('../../controllers/application_controller')


router.route('/follow')
    .post(authentication(AUTH.required), asyncHandlerWrapper(addFollow));

router.route('/follow/job/:id')
    .delete(authentication(AUTH.required), asyncHandlerWrapper(unFollowJob));

router.route('/follow/company/:id')
    .delete(authentication(AUTH.required), asyncHandlerWrapper(unFollowCompany));



router.route('/application')
    .post(authentication(AUTH.required), asyncHandlerWrapper(sendApplication))
    .patch(authentication(AUTH.required), asyncHandlerWrapper(updateApplication))

router.route('/application/:id')
    .delete(authentication(AUTH.required), asyncHandlerWrapper(cancelApplication))
module.exports = router;