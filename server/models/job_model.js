const { queryDB } = require('./mysql_conn.js')

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

    static async getAllJobs(pageSize) {
        const sql = `
        SELECT jobs.id , companies.id AS company_id, brand, job_title AS title, category_position.category, category_position.position, JSON_ARRAYAGG(tags.tag_name) AS tags, salary_top, salary_bottom, location, address, remote_work, logo_image, banner_image, jobs.update_at
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

    static async getJobDetailById(id) {
        const sql = `
        SELECT join_table.id, company_id, brand, title, category, position, job_type,  job_description, skill_required, prefered_qualification,salary_top, salary_type, benifit, salary_bottom, location, address, remote_work, logo_image, banner_image, tags, update_at, JSON_ARRAYAGG(other_images.other_image) AS other_images
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
        GROUP BY join_table.id
        `
        const result = await queryDB(sql, [id])
        return result
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
        ORDER by category_position.order ASC ;
        `
        const result = await queryDB(sql)
        return result
    }
}

module.exports = Job 