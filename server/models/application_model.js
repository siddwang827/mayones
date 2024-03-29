const { queryDB } = require('./mysql_conn.js')


async function getUserApplicationHistory(userId) {
    const sql = `
    SELECT json_object( status, json_object(
        'application_id', JSON_ARRAYAGG(job_application.id),
        'job_id' , JSON_ARRAYAGG(job_id),
        'job_title', JSON_ARRAYAGG(job_title),
        'employer_checked', JSON_ARRAYAGG(employer_checked),
        'seeker_checked', JSON_ARRAYAGG(seeker_checked),
        'brand', JSON_ARRAYAGG(brand), 
        'logo_image', JSON_ARRAYAGG(logo_image),
        'resume_id', JSON_ARRAYAGG(apply_resume_id),
        'interview_date', JSON_ARRAYAGG(interview_date)
     )) AS all_applications 
        FROM mayones.job_application 
        INNER JOIN mayones.jobs
        ON job_application.job_id = jobs.id
        INNER JOIN mayones.companies
        ON jobs.companies_id = companies.id
        WHERE seeker_id = ? 
        GROUP BY status
    `
    const result = await queryDB(sql, [userId])
    const mergeStatus = {}
    result.forEach(ele => {
        switch (Object.keys(ele.all_applications)[0]) {
            case 'arrange':
                mergeStatus.arrange = ele.all_applications.arrange
                break
            case 'pending':
                mergeStatus.pending = ele.all_applications.pending
                break
            case 'archived':
                mergeStatus.archived = ele.all_applications.archived
                break
        }
    })

    return mergeStatus
}

async function getSeekerInfo(applicationId) {
    const sql = `
    SELECT username, contact_email AS seeker_email, job_title, companies.brand AS company_brand, company_address FROM mayones.job_application
    INNER JOIN mayones.users 
    ON job_application.seeker_id = users.id
    INNER JOIN mayones.jobs
    ON job_application.job_id = jobs.id
    INNER JOIN mayones.companies
    ON jobs.companies_id = companies.id
    INNER JOIN mayones.resume
    ON job_application.apply_resume_id = resume.id
    WHERE job_application.id = ? `

    const [result] = await queryDB(sql, [applicationId])
    return result
}


async function userApplyJobWithResume(userId, jobId, resumeId) {
    const sql = `
    INSERT INTO mayones.job_application (seeker_id, job_id, apply_resume_id)
    VALUES (?, ?, ?) 
    `
    const result = await queryDB(sql, [userId, jobId, resumeId])
    return result
}

async function userCancelJobAllication(userId, applicationId) {
    const sql = `
    DELETE FROM mayones.job_application 
    WHERE seeker_id = ? AND id = ?
    `
    const result = await queryDB(sql, [userId, applicationId])

    return result
}

async function userUpdateJobAllication(userId, applicationId) {
    const sql = `
    UPDATE mayones.job_application SET status = 'archived'
    WHERE seeker_id = ? AND id = ? 
    `
    const result = await queryDB(sql, [userId, applicationId])

    return result
}

async function checkUserOwnApplication(userId, applicationId) {
    const sql = `
    SELECT * FROM mayones.job_application 
    WHERE seeker_id = ? AND id = ?
    `
    const [result] = await queryDB(sql, [userId, applicationId])
    let isOwner = false
    if (result) {
        isOwner = true
    }
    return isOwner
}


async function inviteInterviewToSeeker(applicationId, action) {
    let sql = ` UPDATE mayones.job_application `
    let binding = []
    switch (action.status) {
        case 'arrange':
            sql += `SET status = ?, interview_date = ? , seeker_checked = 0 WHERE id = ?`
            binding.push(action.status, action.interviewDate, applicationId)
            break
        case 'reject':
            sql += `SET status = 'reject' WHERE id = ?`
            binding.push(applicationId)
    }

    const result = await queryDB(sql, binding)

    return result
}


async function getApplicationListbyJobOwner(userId) {
    const sql = `
    SELECT job_id,seeker_checked,employer_checked, job_title, 
    json_arrayagg(apply_resume_id) AS resume_id ,
    json_arrayagg(user_name) AS seeker_name, 
    json_arrayagg(seeker_id) AS seeker_id ,
    json_arrayagg(job_application.id) AS application_id
    FROM mayones.job_application
    right JOIN mayones.jobs
    ON job_id = mayones.jobs.id
    LEFT JOIN mayones.resume
    ON apply_resume_id = mayones.resume.id
    WHERE owner_id = ?
    GROUP BY job_id
    `
    const result = await queryDB(sql, [userId])

    return result
}

async function seekerChecked(userId) {
    queryDB('UPDATE mayones.job_application SET seeker_checked = 1 WHERE seeker_id = ?', userId)
}


module.exports = {
    getUserApplicationHistory,
    userApplyJobWithResume,
    userCancelJobAllication,
    inviteInterviewToSeeker,
    userUpdateJobAllication,
    checkUserOwnApplication,
    getApplicationListbyJobOwner,
    seekerChecked,
    getSeekerInfo
}