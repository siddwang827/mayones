const { queryDB } = require('./mysql_conn.js')

const companyLocations = [
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

    static async findCompanies(pageSize, paging, companyQuery) {
        let condition = []
        let binding = []
        let queryKeys = Object.keys(companyQuery)
        let sql = `
            SELECT companies.id, brand, short_description, category, company_location , logo_image, banner_image, JSON_ARRAYAGG(tags.tag_name) AS tags
            FROM mayones.companies
            LEFT JOIN mayones.companies_tags
            ON companies.id = companies_tags.companies_id
            LEFT JOIN mayones.tags
            ON companies_tags.tags_id = tags.id
            GROUP BY companies.id
        `

        if (queryKeys.length > 0) {
            sql = 'SELECT * FROM ( ' + sql + ') AS all_companies '

            queryKeys.forEach(queryType => {
                switch (queryType) {
                    case 'location': {
                        companyQuery[queryType].forEach(location => {
                            condition.push('all_companies.company_location = ?')
                            binding.push(location)
                        })
                        break
                    }
                    case 'category': {
                        companyQuery[queryType].forEach(category => {
                            condition.push('all_companies.category = ?')
                            binding.push(category)
                        })
                        break
                    }
                    case 'tag': {
                        companyQuery[queryType].forEach(tag => {
                            condition.push("all_companies.tags like ?")
                            binding.push(`%${tag}%`)
                        })
                        break
                    }
                }
            })
            sql += 'WHERE ' + condition.join(' AND ')
        }

        const result = await queryDB(sql, binding)
        return result
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

    static async getCompanyTags() {
        const sql = `
        SELECT JSON_ARRAYAGG(tags_arr.tags) companyTags
        FROM (
            SELECT tag_name AS tags
            FROM mayones.tags
            WHERE classification = 'company'
            ORDER BY tags.counts DESC
            ) AS tags_arr
        `
        const [result] = await queryDB(sql)
        return result
    }

    static async getCategories() {
        const sql = `
        SELECT JSON_ARRAYAGG(categories_arr.category) companyCatories
        FROM (
            SELECT category 
            FROM mayones.categories
            ORDER BY categories.counts DESC
            ) AS categories_arr
        `
        const [result] = await queryDB(sql)
        return result
    }
}

module.exports = { Company, companyLocations }