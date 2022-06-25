require('dotenv').config()
const { queryDB } = require('../server/models/mysql_conn.js');
const { user, seekers, companies, openings, categoryPosition, location, tags } = require('./seeds.js')


async function generateCatergoryPosition(categoryPosition) {
    const sql = `INSERT INTO category_position (category, position) VALUES ?`
    const result = await queryDB(sql, [categoryPosition])
    console.log(result)
}

async function generateLocation(location) {
    const sql = `INSERT INTO location (name) VALUES ?`
    const result = await queryDB(sql, [location])
    console.log(result)
}

async function generateTags(tags) {
    const sql = `INSERT INTO tags (name) VALUES ?`
    const result = await queryDB(sql, [tags])
    console.log(result)
}


generateCatergoryPosition(categoryPosition)
// generateLocation(location)
// generateTags(tags)