const router = require("express").Router();
const { asyncHandlerWrapper } = require("../../../utils/utils.js");
const { getPosition, getJobTextareaValue } = require("../../controllers/manage_controller.js");

router.route("/positions").get(asyncHandlerWrapper(getPosition));

router.route("/job-textarea").get(asyncHandlerWrapper(getJobTextareaValue));

module.exports = router;
