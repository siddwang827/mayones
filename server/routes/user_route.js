const router = require('express').Router();
const { asyncHandlerWrapper } = require('../../utils/utils.js')

const {
    getSignUpPage,
    getSignInPage,
    signIn,
    signUp,
} = require('../controllers/user_controller')



router.route(['/employer/signup', '/employee/signup'])
    .get(asyncHandlerWrapper(getSignUpPage));

router.route(['/employer/signin', '/employee/signin'])
    .get(asyncHandlerWrapper(getSignInPage));

router.route('/signup')
    .post(asyncHandlerWrapper(signUp));

router.route('/signin')
    .post(asyncHandlerWrapper(signIn));

module.exports = router