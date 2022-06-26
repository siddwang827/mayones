const router = require('express').Router();
const { asyncHandlerWrapper } = require('../../utils/utils.js')
const {
    getSignUpPage,
    getSignInPage,
    signIn,
    signUp,
    logOut } = require('../controllers/user_controller')



router.route(['/employer/signup', '/employee/signup'])
    .get(asyncHandlerWrapper(getSignUpPage));

router.route(['/employer/signin', '/employee/signin'])
    .get(asyncHandlerWrapper(getSignInPage));

router.route(['/employer/signup', '/employee/signup'])
    .post(asyncHandlerWrapper(signUp));

router.route(['/employer/signin', '/employee/signin'])
    .post(asyncHandlerWrapper(signIn));

module.exports = router