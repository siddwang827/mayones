const { queryDB } = require('./mysql_conn.js')

class Company {
    constructor(ownerId, brand, website, category, shrotDescription, location, address, introduction, philosophy, story, benifit, logoImage, bannerImage) {
        this.ownerId,
            this.brand,
            this.website,
            this.category,
            this.shrotDescription,
            this.location,
            this.address,
            this.introduction,
            this.philosophy,
            this.story,
            this.benifit,
            this.logoImage,
            this.bannerImage
    }

    async createCompany() {

    }

    static async getAllCompanies(pageSize, paging) {
        const sql = `
        SELECT companies.id, brand, short_description, category, JSON_ARRAYAGG(tags.tag_name) AS tags, company_location, logo_image, banner_image
        FROM mayones.companies
        LEFT JOIN mayones.companies_tags
        ON companies.id = companies_tags.companies_id
        LEFT JOIN mayones.tags
        ON companies_tags.tags_id = tags.id
        GROUP BY companies.id
        LIMIT ? 
        `
        const result = await queryDB(sql, pageSize)
        return result
    }

    static async getCompanyDetailById(id) {

    }

    static async deleteCompany(id) {
        const sql = `
        DELETE FROM compaines WHERE id = ?
        `
        const result = await queryDB(sql, id)
        return result

    }
}

module.exports = Company