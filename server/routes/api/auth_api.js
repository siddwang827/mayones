const router = require('express').Router();
const { asyncHandlerWrapper, authentication } = require('../../../utils/utils.js')

const {
    signIn,
    signUp,
} = require('../../controllers/user_controller')


router.route('/signup')
    .post(asyncHandlerWrapper(signUp));

router.route('/signin')
    .post(asyncHandlerWrapper(signIn));


module.exports = router