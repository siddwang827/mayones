const {
    createResume,
    getResumeDetail,
    getUserAllResumes,
    deleteUserResume,
    checkUserOwnResume,
    checkResumeApplication,
    userUpdateResume,
    deleteSingleSkill,
    deleteSingleExperience,
    deleteSingleProject,
    deleteSingleEducation,
} = require("../models/profile_model.js");
const { s3Upload, s3UploadMulti } = require("../models/s3Server");
const moment = require("moment");

const getResumePage = async (req, res) => {
    const header = req.header;
    const userId = req.user.id;

    const resumes = await getUserAllResumes(userId);

    return res.render("resumes", { header, resumes });
};

const getResumeEditPage = async (req, res) => {
    const header = req.header;
    const userId = req.user.id;
    const resumeId = req.params.id;

    const resumeDetail = await getResumeDetail(resumeId, userId);
    const allResumes = await getUserAllResumes(userId);

    return res.render("resumeEdit", { header, resumeDetail, allResumes, moment, resumeId });
};

const fetchResumeDetail = async (req, res) => {
    const resumeId = req.params.id;
    const user = req.user;
    try {
        const resumeDetail = await getResumeDetail(resumeId, user);
        if (!resumeDetail) {
            res.status(403).json({ error: "Forbidden to this resume" });
        }

        res.status(200).json(resumeDetail);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};

const deleteResume = async (req, res) => {
    const resumeId = req.params.id;
    const userId = req.user.id;
    try {
        const isOwner = await checkUserOwnResume(userId, resumeId);
        const isapplied = await checkResumeApplication(resumeId);
        if (!isOwner) {
            return res.status(403).json({ error: "Forbidden to remove resume" });
        }
        if (isapplied) {
            return res.status(403).json({ error: "Reference by another application" });
        }
        await deleteUserResume(userId, resumeId);
        return res.status(200).json({ result: "Resume delete success" });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const uploadResume = async (req, res) => {
    let uploadImage;
    const userId = req.user.id;
    const resume = req.body;

    for (let item in resume) {
        resume[item] = typeof resume[item] === "string" ? [resume[item]] : resume[item];
    }

    if (req.files) {
        uploadImage = await s3UploadMulti(req.files, "resume");
        resume["projectImage"] = uploadImage.map((image) => image.url);
    }

    try {
        const result = await createResume(userId, resume);
        return res.status(200).json({ result: "create resume success!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Upload resume Failed" });
    }
};

const updateResume = async (req, res) => {
    const userId = req.user.id;
    const resume = req.body;
    resume.projectImageSrc = JSON.parse(resume.projectImageSrc);
    resume.projectId = JSON.parse(resume.projectId);
    resume.skillId = JSON.parse(resume.skillId);
    resume.experienceId = JSON.parse(resume.experienceId);
    resume.educationId = JSON.parse(resume.educationId);
    for (let item in resume) {
        resume[item] = typeof resume[item] === "string" ? [resume[item]] : resume[item];
    }

    if (req.files) {
        uploadImage = await s3UploadMulti(req.files, "resume");
        resume["projectImage"] = uploadImage.map((image) => image.url);
    }
    try {
        await userUpdateResume(userId, resume);
        return res.status(200).json({ result: "create resume success!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Upload resume Failed" });
    }
};

const deleteSkill = async (req, res) => {
    const skillId = req.params.id;
    try {
        await deleteSingleSkill(skillId);
        return res.status(200).json({ result: "Delete skill sucess" });
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteExperience = async (req, res) => {
    const experienceId = req.params.id;
    try {
        await deleteSingleExperience(experienceId);
        return res.status(200).json({ result: "Delete experience sucess" });
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteProject = async (req, res) => {
    const projectId = req.params.id;
    try {
        await deleteSingleProject(projectId);
        return res.status(200).json({ result: "Delete project sucess" });
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteEducation = async (req, res) => {
    const educationId = req.params.id;
    try {
        await deleteSingleEducation(educationId);
        return res.status(200).json({ result: "Delete education sucess" });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getResumePage,
    getResumeEditPage,
    fetchResumeDetail,
    updateResume,
    uploadResume,
    deleteResume,
    deleteSkill,
    deleteExperience,
    deleteProject,
    deleteEducation,
};
