const Job = require('../models/job_model')
const { thoundsAddComma } = require('../../utils/utils')
const pageSize = 20
const header = "job"

const getAllJobs = async (req, res) => {
    const paging = parseInt(req.query.paging) || 0
    const category = req.query.category || null
    try {
        const result = await Job.getAllJobs(pageSize, paging, category)
        res.status(200).send({ data: result })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const createJob = async (req, res) => {

}

const getJobDetail = async (req, res) => {
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
    getAllJobs,
    getJobDetail,
    createJob,
    deleteJob
}