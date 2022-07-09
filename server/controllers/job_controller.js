const { Job, jobTypes, jobLocations } = require('../models/job_model')
const { thoundsAddComma } = require('../../utils/utils')
const { promisify } = require('util');
const { TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { s3Upload, s3UploadMulti } = require('../models/s3Server')
const pageSize = 20


const getJobs = async (req, res) => {
    const jobQuery = req.query
    const header = req.header
    const paging = parseInt(req.query.paging) || 0

    // render tempale parameter
    const categoryPositions = await Job.getCategory()
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

const createJob = async (req, res) => {
    const uploadImage = await s3UploadMulti(req.files, "company")

}

const getJobDetail = async (req, res) => {
    const header = req.header
    const jobId = req.params.id
    try {
        const [jobDetail] = await Job.getJobDetailById(jobId)
        res.render('jobDetail', { jobDetail, thoundsAddComma, header })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const deleteJob = async (req, res) => {

}

module.exports = {
    getJobs,
    getJobDetail,
    createJob,
    deleteJob
}