const { Job, jobTypes, jobLocations } = require('../models/job_model')
const { thoundsAddComma } = require('../../utils/utils')
const pageSize = 20


const getJobs = async (req, res) => {
    const jobQuery = req.query
    const header = req.header
    const paging = parseInt(req.query.paging) || 0

    // render tempale parameter
    const categoryPositions = await Job.getCategory()
    console.log(categoryPositions)
    let jobTags = await Job.getJobTags()
    jobTags = jobTags.tags

    try {
        const jobs = await Job.findJobs(pageSize, paging, jobQuery);
        res.render('jobs', { jobs, header, jobLocations, categoryPositions, jobTypes, jobTags })

    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const getJobDetail = async (req, res) => {
    const header = req.header
    const jobId = req.params.id
    let userInfo = { role: null }
    if (req.user) {
        const { role, id } = req.user
        userInfo = { role, id }
    }

    try {
        const jobDetail = await Job.getJobDetailById(jobId, userInfo)
        res.render('jobDetail', { jobDetail, thoundsAddComma, header })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    getJobs,
    getJobDetail,
}