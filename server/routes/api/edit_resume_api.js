const router = require("express").Router();
const { AUTH } = require("../../models/user_model");
const { upload, asyncHandlerWrapper, authentication } = require("../../../utils/utils.js");
const {
    fetchResumeDetail,
    uploadResume,
    deleteResume,
    updateResume,
    deleteSkill,
    deleteExperience,
    deleteProject,
    deleteEducation,
} = require("../../controllers/profile_controller");
const resumeUploadMulter = upload.array("projectImage", 3);

router
    .route("/resume/:id")
    .get(authentication(AUTH.required), asyncHandlerWrapper(fetchResumeDetail))
    .delete(authentication(AUTH.required), asyncHandlerWrapper(deleteResume))
    .patch(authentication(AUTH.required), resumeUploadMulter, asyncHandlerWrapper(updateResume));

router.route("/resume").post(authentication(AUTH.required), resumeUploadMulter, asyncHandlerWrapper(uploadResume));

router.route("/skill/:id").delete(authentication(AUTH.required), asyncHandlerWrapper(deleteSkill));

router.route("/experience/:id").delete(authentication(AUTH.required), asyncHandlerWrapper(deleteExperience));

router.route("/project/:id").delete(authentication(AUTH.required), asyncHandlerWrapper(deleteProject));

router.route("/education/:id").delete(authentication(AUTH.required), asyncHandlerWrapper(deleteEducation));

module.exports = router;
