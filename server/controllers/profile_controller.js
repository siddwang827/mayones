// const { Resume } = require('../models/schemas')
const { createResume, getResumeDetail, getUserAllResumes, deleteUserResume, checkUserOwnResume } = require('../models/profile_model.js')
const { s3Upload, s3UploadMulti } = require('../models/s3Server')

const getResumePage = async (req, res) => {
    const header = req.header
    const userId = req.user.id

    const resumes = await getUserAllResumes(userId)

    return res.render('resumes', { header, resumes })
}

const getResumeEditPage = async (req, res) => {
    const header = req.header
    const userId = req.user.id
    const resumeId = req.params.id

    const resumeDetail = await getResumeDetail(resumeId, userId)
    const allResumes = await getUserAllResumes(userId)
    console.log(resumeDetail)

    return res.render('resumeEdit', { header, resumeDetail, allResumes })

}

const fetchResumeDetail = async (req, res) => {
    const resumeId = req.params.id
    const userId = req.user.id
    try {

        const resumeDetail = await getResumeDetail(resumeId, userId)
        if (!resumeDetail) {
            res.status(403).json({ error: 'Forbidden to this resume' })
        }
        res.status(200).json(resumeDetail)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

const deleteResume = async (req, res) => {
    const resumeId = req.params.id
    const userId = req.user.id
    try {
        const isOwner = await checkUserOwnResume(userId, resumeId)
        if (!isOwner) {
            return res.status(403).json({ error: "Forbidden to remove resume" })
        }
        await deleteUserResume(userId, resumeId)
        return res.status(200).json({ result: "Resume delete success" })
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }



}

const uploadResume = async (req, res) => {
    let uploadImage
    const userId = req.user.id
    const resume = req.body


    for (let item in resume) {
        resume[item] = typeof (resume[item]) === 'string' ? [resume[item]] : resume[item]
    }

    if (req.files) {
        uploadImage = await s3UploadMulti(req.files, "resume")
        resume['projectImage'] = uploadImage.map(image => image.url)
    }
    console.log(resume)

    try {
        const result = await createResume(userId, resume)
        console.log(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Upload resume Failed" })
    }

    res.status(200).json({ result: 'create resume success!' })
}

module.exports = {
    getResumePage,
    getResumeEditPage,
    fetchResumeDetail,
    uploadResume,
    deleteResume
}