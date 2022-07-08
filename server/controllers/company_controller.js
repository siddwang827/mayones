const { Company, companyLocations } = require('../models/company_model')
const { thoundsAddComma } = require('../../utils/utils')
const { promisify } = require('util');
const { TOKEN_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const pageSize = 20
// let header = { view: "company", auth: false }


const getCompanies = async (req, res) => {
    let companyQuery = req.query
    const header = req.header
    const paging = parseInt(req.query.paging) || 0


    // render tempale parameter
    const { companyCatories } = await Company.getCategories()
    const { companyTags } = await Company.getCompanyTags()

    try {
        const companies = await Company.findCompanies(pageSize, paging, companyQuery)

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
    const header = req.header
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

    // check if user own the company!!
    const companyId = req.params.id
    const result = Company.deleteCompany(companyId)
}

module.exports = {
    getCompanies,
    getCompanyDetail,
    createCompany,
    deleteCompany
}
