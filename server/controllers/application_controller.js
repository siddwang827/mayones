const { createResume, getResumeDetail, getUserAllResumes } = require('../models/profile_model.js')
const { Job } = require('../models/job_model.js');
const {

} = require('../models/application_model.js')


const getApplicationPage = async (req, res) => {
    const jobId = req.params.jobId
    const userId = req.user.id
    const header = req.header

    const opening = await Job.getJobSimpleInfo(jobId)
    const allResumes = await getUserAllResumes(userId)

    res.render('application', { header, opening, allResumes })
}


const sendApplication = async (req, res) => {


}

const getApplicationListPage = async (req, res) => {
    const userId = req.user.id
    const header = req.header

    const allResumes = await getUserAllResumes(userId)

    res.render('application', { header, allResumes })
}


module.exports = {
    getApplicationPage,
    sendApplication,
    getApplicationListPage
}