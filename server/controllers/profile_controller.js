// const Profile = require('../models/profile_model');
const { Resume } = require('../models/schemas')
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

    console.log(req.body)
    const resume = new Resume(req.body)
    console.log(resume)
}


module.exports = {
    getResumePage,
    getResumeEditPage,
    uploadResume
}