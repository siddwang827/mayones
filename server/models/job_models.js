const pool = require('./mysql_conn.js')

class Opening {
    constructor(companyId, jobTitle, jobDescription, skillReqired, preferedQualification, salaryTop, salaryBottom, lacation, address, remoteWrok) {
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
        this.categoryAndPosition = await getCategoryAndPosition()
    }

    async getCategoryAndPosition() {
        const sql = `
            SELECT id FROM 
        `


    }

    async createJobOpening() {
        const sql = `
        INSERT INTO mayones.openings ( companies_id, job_title, job_description, skill_required, prefered_qualification, salary_top, salary_bottom, location, address, remote_work, category_position_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT id FROM category_position WHERE category_id = (SELECT id FROM category WHERE name =?) AND job_position_id = (SELECT id FROM job_positions WHERE name =?)));    
        `
    }

    static async getOpeningID() {

    }


}

module.exports = Opening