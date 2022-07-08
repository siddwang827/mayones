const { queryDB } = require('./mysql_conn.js')


async function getAllFollowsByUser(userId, role) {
    if (role === "employee") {
        const sql = `
        SELECT users.id AS user_id, seekers_jobs.id AS follow_id, jobs.id AS job_id, job_title, companies.brand, companies.logo_image FROM mayones.users
        LEFT JOIN mayones.seekers_jobs
        ON users.id = seekers_jobs.user_id
        LEFT JOIN mayones.jobs
        ON seekers_jobs.jobs_id = jobs.id
        LEFT JOiN mayones.companies
        ON jobs.companies_id = companies.id
        WHERE users.id = ? AND seekers_jobs.follow = 1
        `

        const result = await queryDB(sql, [userId])
        return result
    }
}

async function userFollowJob(userId, jobId) {
    const sql = `
    INSERT INTO mayones.seekers_jobs  (user_id, jobs_id, follow)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE follow = 1
    `
    const result = await queryDB(sql, [userId, jobId])
    console.log(result)
}

async function userUnfollowJob(followId) {
    const sql = `
    UPDATE mayones.seekers_jobs SET follow = 0
    WHERE id = ?
    `
    const result = await queryDB(sql, [followId])
    return result
}







module.exports = {
    getAllFollowsByUser,
    userFollowJob,
    userUnfollowJob
} 