require('dotenv').config();
const { NODE_ENV } = process.env;
const bcrypt = require('bcrypt');
const { roles,
    users,
    categories,
    category_position,
    locations,
    tags,
    companies,
    other_images,
    companies_tags,
    jobs,
    jobs_tags } = require('./fake_data')

const { pool } = require('../server/models/mysql_conn');
const salt = parseInt(process.env.SALT_ROUND);

async function _createFakeRole(conn) {
    return await conn.query('INSERT INTO role (id, name) VALUES ?', [roles.map(role => Object.values(role))]);
}

async function _createFakeUser(conn) {
    const sql = 'INSERT INTO users (username, email, password, role_id) VALUES ?'

    const encryped_users = users.map(user => {
        const encryped_user = {
            username: user.username,
            email: user.email,
            password: user.password ? bcrypt.hashSync(user.password, salt) : null,
            role_id: user.role_id,
        };
        return encryped_user;
    });
    return await conn.query(sql, [encryped_users.map(user => Object.values(user))]);
}

async function _createFakeCategories(conn) {
    const sql = 'INSERT INTO categories (category, counts) VALUES ?'
    const binding = categories.map(category => Object.values(category))
    return await conn.query(sql, [binding])
}

async function _createFakeCategoryPposition(conn) {
    const sql = 'INSERT INTO category_position (category, position, view_order) VALUES ?'
    const binding = category_position.map(categoryPosition => Object.values(categoryPosition))
    return await conn.query(sql, [binding])
}

async function _createFakeLocations(conn) {
    const sql = 'INSERT INTO location (name) VALUES ?'
    const binding = locations.map(location => Object.values(location))
    return await conn.query(sql, [binding])
}

async function _createFakeTags(conn) {
    const sql = 'INSERT INTO tags (tag_name, classification, counts) VALUES ?'
    const binding = tags.map(tag => Object.values(tag))
    return await conn.query(sql, [binding])
}

async function _createFakeCompanies(conn) {
    const sql = 'INSERT INTO companies (owner_id, brand, website, category, short_description, company_location, company_address, introduction, philosophy, story, benifit, logo_image, banner_image) VALUES ?'
    const binding = companies.map(company => Object.values(company))
    return await conn.query(sql, [binding])
}

async function _createFakeOtherImages(conn) {
    const sql = 'INSERT INTO other_images (other_image, companies_id) VALUES ?'
    const binding = other_images.map(image => Object.values(image))
    return await conn.query(sql, [binding])
}

async function _createFakeCompaniesTags(conn) {
    const sql = 'INSERT INTO companies_tags (companies_id, tags_id) VALUES ?'
    const binding = companies_tags.map(tag => Object.values(tag))
    return await conn.query(sql, [binding])
}

async function _createFakeJobs(conn) {
    const sql = 'INSERT INTO jobs (owner_id, companies_id, job_title, job_description, skill_required, prefered_qualification, salary_bottom, salary_top, salary_type, job_type, location, address, remote_work, category_position_id) VALUES ?'
    const binding = jobs.map(job => Object.values(job))
    return await conn.query(sql, [binding])
}

async function _createFakeJobsTags(conn) {
    const sql = 'INSERT INTO jobs_tags (jobs_id, tags_id) VALUES ?'
    const binding = jobs_tags.map(tag => Object.values(tag))
    return await conn.query(sql, [binding])
}


async function createFakeData() {
    if (NODE_ENV !== 'test') {
        console.log('Not in test environment');
        return;
    }
    const conn = await pool.getConnection();
    await conn.query('START TRANSACTION');
    // await conn.query('SET FOREIGN_KEY_CHECKS = ?', 0);
    await _createFakeRole(conn)
    await _createFakeUser(conn)
    await _createFakeCategories(conn)
    await _createFakeCategoryPposition(conn)
    await _createFakeLocations(conn)
    await _createFakeTags(conn)
    await _createFakeCompanies(conn)
    await _createFakeOtherImages(conn)
    await _createFakeCompaniesTags(conn)
    await _createFakeJobs(conn)
    await _createFakeJobsTags(conn)
    // await conn.query('SET FOREIGN_KEY_CHECKS = ?', 1);
    await conn.query('COMMIT');
    await conn.release();
}


async function truncateFakeData() {
    if (NODE_ENV !== 'test') {
        console.log('Not in test environment');
        return;
    }

    const truncateTable = async (table) => {
        const conn = await pool.getConnection();
        await conn.query('START TRANSACTION');
        await conn.query('SET FOREIGN_KEY_CHECKS = ?', 0);
        await conn.query(`TRUNCATE TABLE ${table}`);
        await conn.query('SET FOREIGN_KEY_CHECKS = ?', 1);
        await conn.query('COMMIT');
        await conn.release();
        return;
    };

    const tables = [
        "role",
        "users",
        "categories",
        "category_position",
        "location",
        "tags",
        "companies",
        "other_images",
        "companies_tags",
        "jobs",
        "jobs_tags",
    ];


    for (let table of tables) {
        await truncateTable(table);
    }

    return;
}

async function closeConnection() {
    return await pool.end();
}

async function main() {
    await truncateFakeData();
    await createFakeData();
    await closeConnection();
}

// execute when called directly.
if (require.main === module) {
    main();
}

module.exports = {
    createFakeData,
    truncateFakeData,
    closeConnection,
};
