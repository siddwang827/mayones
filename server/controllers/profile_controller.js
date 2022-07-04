// const Profile = require('../models/profile_model');
const { Resume } = require('../models/schemas')
const { createResume } = require('../models/profile_model.js')
const header = { auth: false }



const getResumePage = async (req, res) => {
    const { role, username } = req.user
    if (!req.user) { res.status(400).json({ error: 'Unauthorized' }); return }
    header.auth = true
    header.role = role
    header.username = username
    res.render('resumes', { header })
}

const getResumeEditPage = async (req, res) => {
    const { role, username } = req.user
    if (req.user) {
        header.auth = true
    }
    header.role = role
    header.username = username

    res.render('editResumeForm', { header })
}

const uploadResume = async (req, res) => {
    const userId = req.user.id
    let resume = req.body

    for (let item in resume) {
        resume[item] = typeof (resume[item]) === 'string' ? [resume[item]] : resume[item]
    }

    const result = await createResume(userId, resume)
    console.log(result)

}

module.exports = {
    getProfilePage,
    getResumePage,
    getResumeEditPage,
    uploadResume
}