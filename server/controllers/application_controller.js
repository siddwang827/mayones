const { createResume, getResumeDetail, getUserAllResumes } = require('../models/profile_model.js')
const { Job } = require('../models/job_model.js');
const {

} = require('../models/application_model.js')

let header = { auth: false }

const getApplicationPage = async (req, res) => {
    const jobId = req.params.jobId
    const { role, id, username } = req.user
    if (!req.user) { res.status(400).json({ error: 'Unauthorized' }); return }
    header.auth = true
    header.role = role
    header.username = username

    const opening = await Job.getJobSimpleInfo(jobId)
    const allResumes = await getUserAllResumes(id)


    res.render('application', { header, opening, allResumes })


}


const sendApplication = async (req, res) => {


}


const getApplicationListPage = async (req, res) => {
    const { role, id, username } = req.user
    if (!req.user) { res.status(400).json({ error: 'Unauthorized' }); return }
    header.auth = true
    header.role = role
    header.username = username
    const allResumes = await getUserAllResumes(id)


    res.render('application', { header, allResumes })
}


module.exports = {
    getApplicationPage,
    sendApplication,
    getApplicationListPage
}