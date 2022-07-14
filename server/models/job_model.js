const { queryDB } = require('./mysql_conn.js')

const jobTypes = ['正職', '兼職', '約聘', '實習']
const jobLocations = [
    "台北市",
    "新北市",
    "桃園市",
    "新竹市",
    "新竹縣",
    "台中市",
    "彰化縣",
    "嘉義市",
    "台南市",
    "高雄市",
    "花蓮縣",
    "海外"
]

class Job {
    constructor(companyId, jobTitle, jobDescription, skillReqired, preferedQualification, salaryTop, salaryBottom, lacation, address, remoteWrok, category, position) {
        this.companyId = companyId
        this.jobTitle = jobTitle
        this.jobDescription = jobDescription
        this.skillReqired = skillReqired
        this.preferedQualification = preferedQualification
        this.salaryTop = salaryTop
        this.salaryBottom = salaryBottom
        this.lacation = lacation
        this.address = address
        this.remoteWrok = remoteWrok
        this.category = category
        this.position = position
    }


    async createJobOpening() {
        const sql = `
        INSERT INTO mayones.openings ( companies_id, job_title, job_description, skill_required, prefered_qualification, salary_top, salary_bottom, location, address, remote_work, category_position_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT id FROM category_position WHERE category = ? AND position = ?));    
        `
        const result = queryDB(sql, Object.values(this))
        return result
    }

    static async findJobs(pageSize, paging, jobQuery) {

        let condition = []
        let binding = []
        let queryKeys = Object.keys(jobQuery)
        let sql = `
            SELECT jobs.id , companies.id AS company_id, brand, job_title AS title, job_type, category_position.category, category_position.position,  salary_top, salary_bottom, location, address, remote_work, logo_image, banner_image, jobs.update_at ,JSON_ARRAYAGG(tags.tag_name) AS tags
            FROM mayones.jobs
            left JOIN mayones.companies
            ON jobs.companies_id = companies.id
            LEFT JOIN mayones.jobs_tags
            ON jobs.id = jobs_tags.jobs_id
            LEFT JOIN mayones.tags
            ON jobs_tags.tags_id = tags.id
            LEFT JOIN mayones.category_position
            ON jobs.category_position_id = category_position.id
            GROUP BY jobs.id
            ORDER BY jobs.update_at DESC
        `

        if (queryKeys.length > 0) {

            sql = 'SELECT * FROM (' + sql + ' ) AS all_jobs '
            Object.keys(jobQuery).forEach(queryType => {
                switch (queryType) {
                    case 'location': {
                        jobQuery[queryType].forEach(location => {
                            condition.push('all_jobs.location = ?')
                            binding.push(location)
                        })
                        break
                    }
                    case 'category': {
                        jobQuery[queryType].forEach(category => {
                            condition.push('all_jobs.category = ?')
                            binding.push(category)
                        })
                        break
                    }
                    case 'position': {
                        jobQuery[queryType].forEach(position => {
                            condition.push('all_jobs.position = ?')
                            binding.push(position)
                        })
                        break
                    }
                    case 'jobType': {
                        jobQuery[queryType].forEach(job_type => {
                            condition.push('all_jobs.job_type = ?')
                            binding.push(job_type)
                        })
                        break
                    }
                    case 'tag': {
                        jobQuery[queryType].forEach(tag => {
                            condition.push("all_jobs.tags like ?")
                            binding.push(`%${tag}%`)
                        })
                        break
                    }
                    case 'company': {
                        jobQuery[queryType].forEach(tag => {
                            condition.push('all_jobs.brand = ?')
                            binding.push(tag)
                        })
                    }
                }
            })
            sql += 'WHERE ' + condition.join(' AND ')
        }

        const result = await queryDB(sql, binding)
        return result
    }


    static async getAllJobs(pageSize) {
        const sql = `
        SELECT jobs.id , companies.id AS company_id, brand, job_title AS title, category_position.category, category_position.position, salary_top, salary_bottom, location, address, remote_work, logo_image, banner_image, jobs.update_at, JSON_ARRAYAGG(tags.tag_name) AS tags
        FROM mayones.jobs
        INNER JOIN mayones.companies
        ON jobs.companies_id = companies.id
        LEFT JOIN mayones.jobs_tags
        ON jobs.id = jobs_tags.jobs_id
        LEFT JOIN mayones.tags
        ON jobs_tags.tags_id = tags.id
        LEFT JOIN mayones.category_position
        ON jobs.category_position_id = category_position.id
        GROUP BY jobs.id
        ORDER BY jobs.update_at DESC LIMIT ?
        `
        const result = await queryDB(sql, pageSize)
        return result
    }

    static async getJobDetailById(id, userInfo) {
        let sql = `SELECT 
        join_table.*, update_at, JSON_ARRAYAGG(other_images.other_image) AS other_images
        FROM (
            SELECT jobs.id AS id, 
                companies.id AS company_id,
                brand, job_title AS title, 
                category_position.category AS category, 
                category_position.position AS position,
                job_description,
                skill_required,
                prefered_qualification,
                companies.benifit AS benifit,
                job_type,
                salary_top,
                salary_bottom, 
                salary_type,
                location, 
                address, 
                remote_work, 
                logo_image,
                banner_image, 
                update_at,
                JSON_ARRAYAGG(tags.tag_name) AS tags
            FROM mayones.jobs
            INNER JOIN mayones.companies
            ON jobs.companies_id = companies.id
            LEFT JOIN mayones.jobs_tags
            ON jobs.id = jobs_tags.jobs_id
            LEFT JOIN mayones.tags
            ON jobs_tags.tags_id = tags.id
            LEFT JOIN mayones.category_position
            ON jobs.category_position_id = category_position.id
            GROUP BY jobs.id
        ) 
        AS join_table
        LEFT JOIN mayones.other_images
        ON join_table.company_id = other_images.companies_id 
        WHERE join_table.id = ? 
        GROUP BY join_table.id `

        let [result] = await queryDB(sql, id)
        if (userInfo.role === 'employee') {
            result.follow = 0
            const [follow] = await queryDB('SELECT id, follow FROM mayones.seekers_jobs WHERE jobs_id = ? AND user_id = ?', [id, userInfo.id])
            if (follow) {
                result.follow = follow.follow;
                result.follow_id = follow.id
            }
        }
        return result
    }

    static async createJob(userId, jobTtile, jobDescription, jobRequired, jobPrefer, salaryBottom, salaryTop, salaryType, jobType, location, address, remote_work, positionId, JobTags) {
        let sql = `
        SELECT id FROM mayones.companies WHERE owner_id = ?
        `
        const [company] = await queryDB(sql, [userId])
        sql = `
        INSERT INTO mayones.jobs (owner_id, companies_id, job_title, job_description, skill_required, prefered_qualification, salary_bottom, salary_top, salary_type, job_type, location, address, remote_work, category_position_id)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `
        const result = await queryDB(sql, [userId, company.id, jobTtile, jobDescription, jobRequired, jobPrefer, salaryBottom, salaryTop, salaryType, jobType, location, address, remote_work, positionId])
        const jobId = result.insertId
        const tagArray = JobTags.map(tag => { return [jobId, tag] })
        const insertTag = await queryDB(`INSERT INTO mayones.jobs_tags(jobs_id, tags_id) VALUES ?`, [tagArray])
        console.log(insertTag)
    }

    static async deleteJob(id) {
        const sql = `
        DELETE FROM jobs WHERE id = ?
        `
        const result = await queryDB(sql, id)
        return result
    }

    static async getLocation() {
        const sql = `
        SELECT json_arrayagg(location.name) locations 
        FROM mayones.location 
        GROUP BY 'name' 
        ORDER BY location.order ASC;
        `
        const result = await queryDB(sql)
        return result
    }

    static async getCategory() {
        const sql = `
        SELECT  category , JSON_ARRAYAGG(position) AS position 
        FROM mayones.category_position 
        GROUP BY category
        ORDER BY category_position.order ASC ;
        `
        const result = await queryDB(sql)
        return result
    }

    static async getJobTags() {
        const sql = `
        SELECT JSON_ARRAYAGG(tags_arr.tags) tags
        FROM (
            SELECT tag_name AS tags
            FROM mayones.tags
            ORDER BY tags.counts DESC) AS tags_arr
        `
        const [result] = await queryDB(sql)
        return result
    }

    static async getJobSimpleInfo(jobId) {
        const sql = `
        SELECT jobs.id AS job_id, job_title, companies.id AS company_id, companies.brand FROM mayones.jobs
        INNER JOIN mayones.companies
        ON jobs.companies_id = companies.id
        WHERE jobs.id = ?; 
        `
        const [result] = await queryDB(sql, jobId)
        return result
    }
}

const getCompanyId = async (userId) => {
    const sql = `
    SELECT id FROM mayones.companies AS company_id WHERE owner_id = ?
    `
    const result = await queryDB(sql, [userId])
}


const getJobsCategory = async () => {
    const sql = `
    SELECT json_arrayagg(t.category) AS categories 
    FROM (SELECT distinct category AS category
        FROM mayones.category_position 
        ORDER BY mayones.category_position.order) t
    `
    const [result] = await queryDB(sql)

    return result.categories

}

const getJobTags = async () => {
    const sql = `
    SELECT JSON_arrayagg(json_array(tag_name, id)) AS tags FROM mayones.tags ORDER BY id  ;
    `
    const [result] = await queryDB(sql)
    return result.tags
}

const getJobPositionByCategory = async (category) => {
    const sql = `
    SELECT JSON_arrayagg(json_array(position, id)) AS positions FROM mayones.category_position WHERE category = ?;
    `
    const [result] = await queryDB(sql, [category])
    console.log(result)
    return result.positions

}



module.exports = { Job, jobTypes, jobLocations, getJobTags, getJobsCategory, getJobPositionByCategory, getCompanyId }