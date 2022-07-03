const { Company, companyLocations } = require('../models/company_model')
const { thoundsAddComma } = require('../../utils/utils')
const { promisify } = require('util');
const { TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const pageSize = 20
let header = { view: "company", auth: false }


const getCompanies = async (req, res) => {
    const companyQuery = req.query
    const paging = parseInt(req.query.paging) || 0
    const category = req.query.category || null

    // render tempale parameter
    const { companyCatories } = await Company.getCategories()
    const { companyTags } = await Company.getCompanyTags()

    // check whether user is login
    let accessToken = req.cookies.Authorization
    if (!accessToken) {
        header = { view: "company", auth: false }

    } else {
        try {
            accessToken = accessToken.replace('Bearer ', '');
            const user = await promisify(jwt.verify)(accessToken, TOKEN_SECRET);
            req.user = user;
        } catch (err) {
            res.status(401).send({ error: 'Unauthorized' });
            return
        }
    }

    if (req.user) {
        header.auth = true
        header.role = req.user.role
        header.username = req.user.username
    }
    try {
        const companies = await Company.getAllCompanies(pageSize, companyQuery)
        res.render('companies', { companies, header, companyLocations, companyCatories, companyTags })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const createCompany = async (req, res) => {
    const companyInfo = req.body.data
    const company = new Company(companyInfo)
}

const getCompanyDetail = async (req, res) => {
    if (req.user) {
        header.auth = true
        header.role = req.user.role
        header.username = req.user.username
    }
    const companyId = req.params.id
    try {
        const [companyDetail] = await Company.getCompanyDetailById(companyId)
        res.render('companyDetail', { companyDetail, thoundsAddComma, header })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

const deleteCompany = async (req, res) => {
    const companyId = req.params.id
    const result = Company.deleteCompany(companyId)
}

module.exports = {
    getCompanies,
    getCompanyDetail,
    createCompany,
    deleteCompany
}
