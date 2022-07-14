const { queryDB } = require('./mysql_conn.js')


async function getUserApplicationHistory(userId) {
    const sql = `
    SELECT json_object( status, json_object(
        'application_id', JSON_ARRAYAGG(job_application.id),
        'job_id' , JSON_ARRAYAGG(job_id),
        'job_title', JSON_ARRAYAGG(job_title),
        'employer_checked', JSON_ARRAYAGG(employer_checked),
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


async function confirmJobApplication(jobId, resumeId, confirm,) {
    let sql = ' UPDATE mayones.job_application '
    let binding = []
    switch (confirm.status) {
        case 'accept':
            sql += `SET 'status' = 'accept',  SET 'interview_date' = ? `
            binding = [confirm.intervewDate]
            break
        case 'reject':
            sql += `SET 'status' = 'reject' `
            break
        default:
            sql += `WHERE job_id = ? AND  apply_resume_id = ?`
            binding.push(jobId, resumeId)
    }

    const result = await queryDB(sql, binding)

    return result
}


module.exports = {
    getUserApplicationHistory,
    userApplyJobWithResume,
    userCancelJobAllication,
    confirmJobApplication,
    userUpdateJobAllication,
    checkUserOwnApplication
}