const { queryDB, pool } = require('./mysql_conn.js')
const ROLE_ID = {
    'employee': 1,
    'employer': 2
}

async function getAllFollowsByUser(userId, role) {
    if (role === "employee") {
        const queryJobFollows = `
        SELECT users.id AS user_id, seekers_jobs.id AS follow_id, jobs.id AS job_id, job_title, companies.brand, companies.logo_image FROM mayones.users
        LEFT JOIN mayones.seekers_jobs
        ON users.id = seekers_jobs.user_id
        LEFT JOIN mayones.jobs
        ON seekers_jobs.jobs_id = jobs.id
        LEFT JOiN mayones.companies
        ON jobs.companies_id = companies.id
        WHERE users.id = ? AND seekers_jobs.follow = 1
        `
        const queryCompanyFollows = `
        SELECT users.id AS user_id, seekers_companies.id AS follow_id, companies.id AS company_id, companies.brand, companies.logo_image FROM mayones.users
        LEFT JOIN mayones.seekers_companies
        ON users.id = seekers_companies.user_id
        LEFT JOiN mayones.companies
        ON seekers_companies.companies_id = companies.id
        WHERE users.id = ? AND seekers_companies.follow = 1
        `

        let [[jobs], [companies]] = await Promise.all([pool.query(queryJobFollows, userId), pool.query(queryCompanyFollows, userId)])

        return { jobs, companies }
    }
}

async function userFollowJob(userId, jobId) {
    const sql = `
    INSERT INTO mayones.seekers_jobs  (user_id, jobs_id, follow)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE follow = 1
    `
    await queryDB(sql, [userId, jobId])
    const [followId] = await queryDB('SELECT id FROM mayones.seekers_jobs WHERE user_id = ? AND jobs_id = ?', [userId, jobId])
    return followId
}



async function userUnfollowJob(followId) {
    const sql = `
    UPDATE mayones.seekers_jobs SET follow = 0
    WHERE id = ?
    `
    const result = await queryDB(sql, [followId])
    return result
}

async function userFollowCompany(userId, companyId) {
    const sql = `
    INSERT INTO seekers_companies  (user_id, companies_id, follow)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE follow = 1
    `
    await queryDB(sql, [userId, companyId])
    const [followId] = await queryDB('SELECT id FROM mayones.seekers_companies WHERE user_id = ? AND companies_id = ?', [userId, companyId])
    return followId
}

async function userUnfollowCompany(followId) {
    const sql = `
    UPDATE mayones.seekers_companies SET follow = 0
    WHERE id = ?
    `
    const result = await queryDB(sql, [followId])
    return result
}


module.exports = {
    getAllFollowsByUser,
    userFollowJob,
    userUnfollowJob,
    userFollowCompany,
    userUnfollowCompany
} 