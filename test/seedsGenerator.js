require('dotenv').config()
const { queryDB } = require('../server/models/mysql_conn.js');
const { user, seekers, companies, openings, categoryPosition, location, tags } = require('./seeds.js')


async function generateCatergoryPosition(categoryPosition) {
    const sql = `INSERT INTO category_position (category, position) VALUES ?`
    const result = await queryDB(sql, [categoryPosition])
}

async function generateLocation(location) {
    const sql = `INSERT INTO location (name) VALUES ?`
    const result = await queryDB(sql, [location])
}

async function generateTags(tags) {
    const sql = `INSERT INTO tags (name) VALUES ?`
    const result = await queryDB(sql, [tags])
}


// generateCatergoryPosition(categoryPosition)
// generateLocation(location)
// generateTags(tags)