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
        const sql = `
        SELECT join_table.id, brand, website, category, short_description, company_location, company_address, introduction, philosophy, story, benifit, logo_image, banner_image,  tags, JSON_ARRAYAGG(other_images.other_image) AS other_images
        FROM ( 
            SELECT companies.id AS id,
                brand, 
                companies.category AS category,    
                website,      
                short_description, 
                company_location, 
                company_address, 
                introduction, 
                philosophy, 
                story, 
                benifit, 
                logo_image, 
                banner_image,
                JSON_ARRAYAGG(tags.tag_name) AS tags
            FROM mayones.companies
            LEFT JOIN mayones.companies_tags
            ON companies.id = companies_tags.companies_id
            LEFT JOIN mayones.tags
            ON companies_tags.tags_id = tags.id
            GROUP BY companies_id
        ) 
        AS join_table
        LEFT JOIN mayones.other_images
        ON join_table.id = other_images.companies_id
        WHERE join_table.id = ?
        GROUP BY join_table.id
        `
        const result = await queryDB(sql, [id])
        return result
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