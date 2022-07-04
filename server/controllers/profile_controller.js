// const Profile = require('../models/profile_model');
const { Resume } = require('../models/schemas')
const { createResume } = require('../models/profile_model.js')
const header = { auth: false }


const getResumePage = async (req, res) => {
    const { role, username } = req.user
    if (req.user) {
        header.auth = true
    }
    header.role = role
    header.username = username
    res.render('resumes', { header })
}

const getResumeEditPage = async (req, res) => {
    const { role, username } = req.user
    if (req.user) {
        header.auth = true
    }
    header.role = role
    header.username = username

    res.render('editResumeForm', { header })
}



const uploadResume = async (req, res) => {
    const userId = req.user.id
    let resume = req.body
    console.log(resume)
    for (let item in resume) {
        resume[item] = typeof (resume[item]) === 'string' ? [resume[item]] : resume[item]
    }

    // let skills = {
    //     skill_name: typeof (resume.skillName) === 'string' ? [resume.skillName] : resume.skillName,
    //     skill_proficiency: typeof (resume.skillProficiency) === 'string' ? [resume.skillProficiency] : resume.skillProficiency,
    //     skill_intro: typeof (resume.skillInfo) === 'string' ? resume.skillInfo : [resume.skillInfo]
    // }

    // console.log(skills, projects, experience, education)
    // const experience = {
    //     experience_title: typeof (resume.experienceName) === Array ? [resume.experienceName] : resume.experienceName,
    //     experience_org: typeof (resume.experienceCompanyName) === 'string' ? [resume.experienceCompanyName] : resume.experienceCompanyName,
    //     experience_start: typeof (resume.experienceTimeStart) === 'string' ? [resume.experienceTimeStart] : resume.experienceTimeStart,
    //     experience_end: typeof (resume.experienceTimeEnd) === 'string' ? [resume.experienceTimeEnd] : resume.experienceTimeEnd,
    //     experience_intro: typeof (resume.experienceInfo) === 'string' ? [resume.experienceInfo] : resume.experienceInfo
    // }
    // const education = {
    //     education_title: typeof (resume.educationName) === 'string' ? [resume.educationName] : resume.educationName,
    //     education_department: typeof (resume.educationDepartment) === 'string' ? [resume.educationDepartment] : resume.educationDepartment,
    //     education_degree: typeof (resume.educationDegree) === 'string' ? [resume.educationDegree] : resume.educationDegree,
    //     education_start: typeof (resume.educationTimeStart) === 'string' ? [resume.educationTimeStart] : resume.educationTimeStart,
    //     education_end: typeof (resume.educationTimeEnd) === 'string' ? [resume.educationTimeEnd] : resume.educationTimeEnd
    // }
    // const projects = {
    //     project_title: typeof (resume.projectTitle) === 'string' ? [resume.projectTitle] : resume.projectTitle,
    //     project_link: typeof (resume.projectLink) === 'string' ? [resume.projectLink] : resume.projectLink,
    //     project_intro: typeof (resume.projectInfo) === 'string' ? [resume.projectInfo] : resume.projectInfo,
    //     project_image: ['http://image.com'],
    // }
    const result = await createResume(userId, resume)
    console.log(result)
    // const result = await createResume(profile, skills, experience, education, projects)

}

module.exports = {
    getResumePage,
    getResumeEditPage,
    uploadResume
}