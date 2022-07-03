const { Job, jobTypes, jobLocations } = require('../models/job_model')
const { thoundsAddComma } = require('../../utils/utils')
const { promisify } = require('util');
const { TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const pageSize = 20
let header = { view: "job", auth: false }



const getJobs = async (req, res) => {
    let jobQuery = req.query
    const paging = parseInt(req.query.paging) || 0

    // render tempale parameter
    const categoryPositions = await Job.getCategory()
    let jobTags = await Job.getJobTags()
    jobTags = jobTags.tags

    // check whether user is login
    let accessToken = req.cookies.Authorization
    if (!accessToken) {
        header = { view: "job", auth: false }

    } else {
        try {
            accessToken = accessToken.replace('Bearer ', '');
            const user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
            req.user = user;
        } catch (err) {
            console.log(err)
            res.status(401).send({ error: 'Unauthorized' });
            return
        }
    }

    if (req.user) {
        header.auth = true
        header.role = req.user.role
        header.username = req.user.username
    }

    try {
        let jobs;

        if (Object.keys(jobQuery).length !== 0) { jobs = await Job.findJobs(pageSize, paging, jobQuery) }
        else { jobs = await Job.getAllJobs(pageSize, paging) }
        res.render('jobs', { jobs, header, jobLocations, categoryPositions, jobTypes, jobTags })

    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const createJob = async (req, res) => {

}

const getJobDetail = async (req, res) => {
    let accessToken = req.cookies.Authorization
    console.log(accessToken)
    if (!accessToken) { header = { view: "job", auth: false } }
    else {
        try {
            accessToken = accessToken.replace('Bearer ', '');
            const user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
            req.user = user;
        } catch (err) {
            res.status(401).send({ error: 'Unauthorized' });
        }
    }

    if (req.user) {
        header.auth = true
        header.role = req.user.role
        header.username = req.user.username
    }

    const jobId = req.params.id
    try {
        console.log(header)
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