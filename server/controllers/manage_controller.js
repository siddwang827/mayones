const { Company, companyLocations, getALLCategory, getALLCompanyTag } = require('../models/company_model')
const { Job, jobTypes, jobLocations, getJobsCategory, getJobPositionByCategory, getJobTags } = require('../models/job_model')
const { getResumeDetail, updateResumeEmployerCheck } = require('../models/profile_model')
const { getApplicationListbyJobOwner, inviteInterviewToSeeker, } = require('../models/application_model')
const { s3Upload, s3UploadMulti } = require('../models/s3Server')
const moment = require('moment')


const getCompanyManagePage = async (req, res) => {
    const header = req.header

    const categories = await getALLCategory()
    const tags = await getALLCompanyTag()

    return res.render('manageCompany', { header, companyLocations, categories, tags })
}

const createCompanyDetail = async (req, res) => {
    const userId = req.user.id
    let companyDetail = req.body
    companyDetail.companyTags = JSON.parse(companyDetail.companyTags)
    let { logoImage, bannerImage, otherImages } = req.files
    if (Object.keys(req.files).length > 0) {
        companyDetail['logoImage'] = await s3Upload(logoImage[0], "company/logo")
        companyDetail['bannerImage'] = await s3Upload(bannerImage[0], "company/banner")
        companyDetail['otherImages'] = await s3UploadMulti(otherImages, "company/others")
    }
    try {
        const result = await Company.createCompany(
            userId,
            companyDetail.companyTitle,
            companyDetail.companyUrl,
            companyDetail.companyCategory,
            companyDetail.companyShort,
            companyDetail.companyLocation,
            companyDetail.companyAddress,
            companyDetail.companyIntro,
            companyDetail.companyPhilosophy,
            companyDetail.companyBenifit,
            companyDetail.companyTags,
            companyDetail.logoImage,
            companyDetail.bannerImage,
            companyDetail.otherImages,
        )
        return res.status(200).json({ result: "Update company sucess" })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(403).json({ error: 'Already create company' })
        }
        console.log(error)
        res.status(500).json(error)
    }
}

const getJobManagePage = async (req, res) => {
    const header = req.header
    const categories = await getJobsCategory()
    const tags = await getJobTags()

    return res.render('manageJob', { header, jobTypes, jobLocations, categories, tags })
}

const createJobDetail = async (req, res) => {
    const userId = req.user.id
    const jobDetail = req.body
    jobDetail.jobTags = JSON.parse(jobDetail.jobTags)
    try {
        const result = await Job.createJob(
            userId,
            jobDetail.jobTitle,
            jobDetail.jobIntro,
            jobDetail.jobRequired,
            jobDetail.jobPrefer,
            jobDetail.salaryBottom,
            jobDetail.salaryTop,
            jobDetail.salaryType,
            jobDetail.jobType,
            jobDetail.joblocation,
            jobDetail.jobAddress,
            jobDetail.jobRemote,
            jobDetail.jobPosition,
            jobDetail.jobTags,
        )
        return res.status(200).json({ result: 'create job sucess' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getApplicationsManagePage = async (req, res) => {
    const userId = req.user.id
    const header = req.header

    try {
        const applications = await getApplicationListbyJobOwner(userId)
        return res.render('employerApplication', { header, applications })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

const getPosition = async (req, res) => {
    const category = req.query.category
    const positions = await getJobPositionByCategory(category)
    return res.status(200).json(positions)
}

const checkUserResume = async (req, res) => {
    const applicationId = req.body.applicationId
    const resumeId = req.body.resumeId
    const user = req.user
    try {

        const resumeDetail = await getResumeDetail(resumeId, user)
        if (!resumeDetail) {
            res.status(403).json({ error: 'Forbidden check to this resume' })
        }
        updateResumeEmployerCheck(applicationId)
        res.status(200).json(resumeDetail)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
}

const inviteInterview = async (req, res) => {
    let { applicationId, action } = req.body
    try {
        const result = await inviteInterviewToSeeker(applicationId, action)
        console.log(result)
        res.status(200).json({ result: 'Invite interview sucess' })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }



}

module.exports = {
    getCompanyManagePage,
    getJobManagePage,
    getApplicationsManagePage,
    getPosition,
    createCompanyDetail,
    createJobDetail,
    checkUserResume,
    inviteInterview
}