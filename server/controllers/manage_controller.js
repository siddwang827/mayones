const { Company, companyLocations, getALLCategory, getALLCompanyTag } = require('../models/company_model')
const { Job, jobTypes, jobLocations, getJobsCategory, getJobPositionByCategory, getJobTags } = require('../models/job_model')
const { s3Upload, s3UploadMulti } = require('../models/s3Server')

const getCompanyManagePage = async (req, res) => {
    const header = req.header

    const categories = await getALLCategory()
    const tags = await getALLCompanyTag()

    return res.render('manageCompany', { header, companyLocations, categories, tags })
}

const createCompanyDetail = async (req, res) => {
    let companyDetail = req.body
    companyDetail.companyTags = JSON.parse(companyDetail.companyTags)
    let { logoImage, bannerImage, otherImages } = req.files
    if (Object.keys(req.files).length > 0) {
        companyDetail['logoImage'] = await s3Upload(logoImage[0], "company/logo")
        companyDetail['bannerImage'] = await s3Upload(bannerImage[0], "company/banner")
        companyDetail['otherImages'] = await s3UploadMulti(otherImages, "company/others")
    }
    return res.status(200).json({ result: "Update company sucess" })
}

const getJobManagePage = async (req, res) => {
    const header = req.header
    const categories = await getJobsCategory()
    const tags = await getJobTags()

    return res.render('manageJob', { header, jobTypes, jobLocations, categories, tags })
}

const createJobDetail = async (req, res) => {
    const jobDetail = req.body
    jobDetail.jobTags = JSON.parse(jobDetail.jobTags)
    console.log(jobDetail)
    return res.status(200)
}

const getApplicationsePage = async (req, res) => {

}

const getPosition = async (req, res) => {

    const category = req.query.category
    const positions = await getJobPositionByCategory(category)
    console.log(positions)
    return res.status(200).json(positions)
}
module.exports = {
    getCompanyManagePage,
    createCompanyDetail,
    getJobManagePage,
    createJobDetail,
    getApplicationsePage,
    getPosition
}