const { queryDB, pool } = require('./mysql_conn.js')
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

    static async createCompany(userId, brand, website, category, shrotDescription, companyLocation, companyAddress, introduction, philosophy, benifit, companyTags, logoImage, bannerImage, otherImages) {
        try {
            let sql = `
            INSERT INTO mayones.companies (
                owner_id, brand, website, category, short_description, company_location, 
                company_address, introduction, philosophy, benifit, logo_image, banner_image
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `
            let sqlTag = `INSERT INTO mayones.companies_tags (companies_id, tags_id) VALUES ?`
            let sqlOtherImage = `INSERT INTO mayones.other_images (companies_id, other_image) VALUES ?`
            let binding = [userId, brand, website, category, shrotDescription, companyLocation, companyAddress, introduction, philosophy, benifit, logoImage.url, bannerImage.url]

            const conn = await pool.getConnection()
            await conn.query('START TRANSACTION');

            const [result] = await conn.query(sql, binding)
            const companyId = result.insertId
            const otherImagesArray = otherImages.map(image => { return [companyId, image.url] })
            const tagArray = companyTags.map(tag => { return [companyId, tag] })
            await Promise.all([conn.query(sqlTag, [tagArray]), conn.query(sqlOtherImage, [otherImagesArray])])
            await conn.query('COMMIT');
            await conn.release()
            return true
        } catch (error) {
            console.log(error)
            await conn.query('ROLLBACK')
            await conn.release()
            return false
        }
    }

    static async findCompanies(pageSize, paging, companyQuery) {
        let sqlCondition = []
        let sqlBinding = []
        let queryKeys = Object.keys(companyQuery)
        let sql = `
            SELECT companies.id, brand, short_description, 
            category, company_location , logo_image, banner_image, 
            JSON_ARRAYAGG(tags.tag_name) AS tags
            FROM mayones.companies
            LEFT JOIN mayones.companies_tags
            ON companies.id = companies_tags.companies_id
            LEFT JOIN mayones.tags
            ON companies_tags.tags_id = tags.id
            GROUP BY companies.id
        `

        let locationQ = { condition: "", binding: companyQuery.location ? companyQuery.location : null }
        let categoryQ = { condition: "", binding: companyQuery.category ? companyQuery.category : null }
        let tagQ = { condition: "", binding: companyQuery.tag ? companyQuery.tag.map(t => `%${t}%`) : null }
        if (tagQ.binding) {
            tagQ.binding = tagQ.binding.concat(tagQ.binding)
        }
        let conditions = [locationQ, categoryQ, tagQ]
        if (queryKeys.length > 0) {
            sql = 'SELECT * FROM ( ' + sql + ') AS all_companies '

            queryKeys.forEach(type => {
                switch (type) {
                    case "location":
                        locationQ.condition = `( ${(Array(companyQuery[type].length).fill('all_companies.company_location = ?')).join(' or ')} )`
                        break
                    case "category":
                        categoryQ.condition = `( ${(Array(companyQuery[type].length).fill('all_companies.category = ?')).join(' or ')} )`
                        break
                    case "tag":
                        tagQ.condition = `( ${(Array(companyQuery[type].length).fill('all_companies.tags like ? OR all_companies.brand like ?')).join(' or ')} )`
                        break
                }
            })

            conditions.forEach(cond => {
                if (cond.binding) {
                    sqlCondition.push(cond.condition)
                    sqlBinding = sqlBinding.concat(cond.binding)
                }
            })

            sql += 'WHERE ' + sqlCondition.join(' AND ')
        }

        const result = await queryDB(sql, sqlBinding)

        return result
    }


    static async getAllCompanies(pageSize, paging) {
        const sql = `
        SELECT companies.id, brand, short_description, category, 
        JSON_ARRAYAGG(tags.tag_name) AS tags, company_location, 
        logo_image, banner_image
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

    static async getCompanyDetailById(id, userInfo) {
        const sql = `
        SELECT join_table.id, brand, website, category, short_description, 
        company_location, company_address, introduction, philosophy, story, benifit, 
        logo_image, banner_image,  tags, JSON_ARRAYAGG(other_images.other_image) AS other_images
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
        let [result] = await queryDB(sql, [id])
        if (userInfo.role === 'employee') {
            result.follow = 0
            const [follow] = await queryDB(`
            SELECT id, follow 
            FROM mayones.seekers_companies 
            WHERE companies_id = ? AND user_id = ?`, [id, userInfo.id])

            if (follow) {
                result.follow = follow.follow;
                result.follow_id = follow.id
            }
        }
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

const getALLCategory = async () => {
    const sql = `
    SELECT JSON_ARRAYAGG(category) AS categories 
    FROM mayones.categories;
    `
    const [result] = await queryDB(sql)
    return result.categories

}

const getALLCompanyTag = async () => {
    const sql = `
    SELECT JSON_arrayagg(json_array(tag_name, id)) AS tags 
    FROM mayones.tags WHERE classification != 'job' 
    ORDER BY id;
    `
    const [result] = await queryDB(sql)
    return result.tags

}


module.exports = { Company, companyLocations, getALLCategory, getALLCompanyTag }