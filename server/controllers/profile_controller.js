// const { Resume } = require('../models/schemas')
const { createResume, getResumeDetail, getUserAllResumes } = require('../models/profile_model.js')
const headerINfo = { auth: false }

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

    const resumeDetail = await getResumeDetail(resumeId)
    const allResumes = await getUserAllResumes(userId)

    return res.render('resumeEdit', { header, resumeDetail, allResumes })

}

const fetchResumeDetail = async (req, res) => {
    const resumeId = req.params.id
    const { role, username, id } = req.user
    if (req.user) {
        header.auth = true
    }
    header.role = role
    header.username = username

}

const deleteResume = async (req, res) => {


}

const uploadResume = async (req, res) => {
    const userId = req.user.id
    let resume = req.body


    for (let item in resume) {
        resume[item] = typeof (resume[item]) === 'string' ? [resume[item]] : resume[item]
    }
    try {
        const result = await createResume(userId, resume)
        console.log(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Upload resume Failed" })
    }

    res.redirect('/resumes')
}

module.exports = {
    getResumePage,
    getResumeEditPage,
    fetchResumeDetail,
    uploadResume,
    deleteResume
}