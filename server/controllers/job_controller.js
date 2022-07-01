const Job = require('../models/job_model')
const { thoundsAddComma } = require('../../utils/utils')
const pageSize = 20
const header = { view: "job", auth: false }


const getLocation = async () => {
    const [locations] = await Job.getLocation()
    return locations
}

const getCategory = async () => {
    const category = await Job.getCategory()
    return category
}



const getAllJobs = async (req, res) => {
    const query = req.query ? req.query : null
    const paging = parseInt(req.query.paging) || 0
    const category = req.query.category || null
    const { locations } = await getLocation()
    const positions = await getCategory()
    console.log(positions)
    if (req.user) {
        header.auth = true
        header.role = req.user.role
        header.username = req.user.username
    }
    try {
        const jobs = await Job.getAllJobs(pageSize, paging, category)
        res.render('jobs', { jobs, header, locations, positions })

    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const createJob = async (req, res) => {

}

const getJobDetail = async (req, res) => {
    if (req.user) {
        header.auth = true
        header.role = req.user.role
        header.username = req.user.username
    }
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