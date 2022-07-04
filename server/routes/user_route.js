const router = require('express').Router();
const { asyncHandlerWrapper, authentication } = require('../../utils/utils.js')

const {
    getSignUpPage,
    getSignInPage,
    signIn,
    signUp,
    logout
} = require('../controllers/user_controller')



router.route(['/employer/signup', '/employee/signup'])
    .get(asyncHandlerWrapper(getSignUpPage));

router.route(['/employer/signin', '/employee/signin'])
    .get(asyncHandlerWrapper(getSignInPage));

router.route('/signup')
    .post(asyncHandlerWrapper(signUp));

router.route('/signin')
    .post(asyncHandlerWrapper(signIn));

router.route('/logout')
    .get(authentication(), asyncHandlerWrapper(logout));

module.exports = router