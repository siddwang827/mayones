const { Company, companyLocations, getALLCategory, getALLCompanyTag } = require('../models/company_model')
const { Job, jobTypes, jobLocations, getJobsCategory, getJobPositionByCategory, getJobTags, getCompanyAllOpenings, getJobTextarea } = require('../models/job_model')
const { getResumeDetail, updateResumeEmployerCheck } = require('../models/profile_model')
const { getApplicationListbyJobOwner, inviteInterviewToSeeker, getSeekerInfo } = require('../models/application_model')
const { s3Upload, s3UploadMulti } = require('../models/s3Server')
const moment = require('moment')
const nodemailer = require('nodemailer')
const { GMAIL_ACCOUNT,
    GMAIL_PW } = process.env

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
        if (result) {
            return res.status(200).json({ result: "Update company sucess" })
        } else {
            res.status(403).json({ error: 'Update company failed' })
        }

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
    const userId = req.user.id
    let [categories, tags, alljobs] = await Promise.all([
        getJobsCategory(),
        getJobTags(),
        getCompanyAllOpenings(userId)
    ])

    return res.render('manageJob', { header, jobTypes, jobLocations, categories, tags, alljobs })
}

const getJobOpeningEidtPage = async (req, res) => {
    const header = req.header
    const jobId = req.params.id
    let { role, id } = req.user
    const userInfo = { role, id }

    let [categories, tags, alljobs, jobDetails] = await Promise.all([
        getJobsCategory(),
        getJobTags(),
        getCompanyAllOpenings(userInfo.id),
        Job.getJobDetailById(jobId, userInfo)
    ])
    const positions = await getJobPositionByCategory(jobDetails.category)
    console.log(positions)

    return res.render('manageJobEdit', { header, jobTypes, jobLocations, categories, tags, alljobs, jobDetails, positions })
}
const createJobDetail = async (req, res) => {
    const userId = req.user.id
    const jobDetail = req.body
    jobDetail.jobTags = JSON.parse(jobDetail.jobTags)
    try {
        await Job.createJob(
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

    let positions = await getJobPositionByCategory(category)
    return res.status(200).json(positions)
}

const getJobTextareaValue = async (req, res) => {
    const jobId = req.query.id

    let jobTextarea = await getJobTextarea(jobId)

    return res.status(200).json({ jobTextarea })

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
        if (action.status === "arrange") {

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: GMAIL_ACCOUNT,
                    pass: GMAIL_PW,
                },
            });
            const seekerInfo = await getSeekerInfo(applicationId)
            let info = await transporter.sendMail({
                from: `Mayones <mayones@website.com>`,
                // to: `awaitcabal@hotmail.com`,
                to: `${seekerInfo.seeker_email}`,
                subject: `來自 ${seekerInfo.company_brand} - ${seekerInfo.job_title} 的面試邀約`,
                html: `
                <h3>Hi, ${seekerInfo.username}</h3>
                <p>${seekerInfo.company_brand} 在此誠摯地邀請您</p>
                <p>於 ${action.interviewDate}</p>
                <p>至 ${seekerInfo.company_address} </p>
                <p>參與 ${seekerInfo.job_title} 的面試！</p>
                </br>
                </br>
                </br>
                <p>Sincerely,</p>
                <p>Mayones</P>
                `,
            });

            console.log("Message sent: %s", info.messageId);
        }



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
    getJobOpeningEidtPage,
    getJobTextareaValue,
    createCompanyDetail,
    createJobDetail,
    checkUserResume,
    inviteInterview,


}