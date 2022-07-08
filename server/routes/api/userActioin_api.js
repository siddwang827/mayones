const router = require('express').Router();
const { asyncHandlerWrapper, authentication } = require('../../../utils/utils.js')
const { AUTH } = require('../../models/user_model')
const {
    addFollow,
    unFollow
} = require('../../controllers/follow_controller.js')

const { sendApplication } = require('../../controllers/application_controller')


router.route('/follow')
    .post(authentication(AUTH.required), asyncHandlerWrapper(addFollow));

router.route('/unfollow')
    .post(authentication(AUTH.required), asyncHandlerWrapper(unFollow));

router.route('/application/')
    .post(authentication(AUTH.required), asyncHandlerWrapper(sendApplication));


module.exports = router;