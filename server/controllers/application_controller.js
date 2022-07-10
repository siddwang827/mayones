const { getUserAllResumes } = require('../models/profile_model.js')
const { getUserApplicationHistory,
    userApplyJobWithResume,
    userCancelJobAllication,
    userUpdateJobAllication,
    confirmJobApplication,
    checkUserOwnApplication,
} = require('../models/application_model.js')
const { Job } = require('../models/job_model.js');
const moment = require('moment')


const getApplicationPage = async (req, res) => {
    const jobId = req.params.jobId
    const userId = req.user.id
    const header = req.header
    try {
        const opening = await Job.getJobSimpleInfo(jobId)

        if (!opening) {
            res.status(403).json({ error: 'Forbidden to apply job!' })
        }
        const allResumes = await getUserAllResumes(userId)


        return res.render('applicationPage', { header, opening, allResumes })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}


const sendApplication = async (req, res) => {
    const userId = req.user.id
    const { jobId, resumeId } = req.body
    try {
        const result = await userApplyJobWithResume(userId, jobId, resumeId)
        return res.status(200).json({ result: "Apply job success" })
    }
    catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(403).json({ error: "Duplicate Application" })
        }
        console.log(error)
        return res.status(500).json({ error })
    }
}

const getApplicationListPage = async (req, res) => {
    const userId = req.user.id
    const header = req.header
    try {
        const applications = await getUserApplicationHistory(userId)

        return res.render('applicationHistory', { header, applications, moment })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }

}

const updateApplication = async (req, res) => {
    const userId = req.user.id
    const applicationId = req.body.applicationId
    try {
        const isOwner = await checkUserOwnApplication(userId, applicationId)
        if (!isOwner) {
            res.status(403).json({ error: "Forbidden" })
        }
        const result = await userUpdateJobAllication(userId, applicationId)

        return res.status(200).json({ result: "Update application success!" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }


}

const cancelApplication = async (req, res) => {

    const userId = req.user.id
    const applicationId = req.params.id
    try {
        const isOwner = await checkUserOwnApplication(userId, applicationId)
        if (!isOwner) {
            res.status(403).json({ error: "Forbidden" })
        }
        const result = await userCancelJobAllication(userId, applicationId)

        return res.status(200).json({ result: "Delete application success!" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }


}


module.exports = {
    getApplicationPage,
    sendApplication,
    getApplicationListPage,
    updateApplication,
    cancelApplication
}