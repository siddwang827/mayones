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

const getApplicationsePage = async (req, res) => {

}

const getPosition = async (req, res) => {
    const category = req.query.category
    const positions = await getJobPositionByCategory(category)
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