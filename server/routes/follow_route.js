const router = require('express').Router();
const { asyncHandlerWrapper,
    authentication } = require('../../utils/utils.js')

const { getAllFollows,
    addFollow,
    unFollow
} = require('../controllers/follow_controller.js')


router.route('/follows')
    .get(authentication(), asyncHandlerWrapper(getAllFollows));

router.route('/follow/')
    .post(authentication(), asyncHandlerWrapper(addFollow));

router.route('/unfollow')
    .post(authentication(), asyncHandlerWrapper(unFollow));


module.exports = router;