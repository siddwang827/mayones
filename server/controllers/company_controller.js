const Company = require('../models/company_model')
const { thoundsAddComma } = require('../../utils/utils')
const pageSize = 20
const header = { view: "company", auth: false }


const getAllCompanies = async (req, res) => {
    const paging = parseInt(req.query.paging) || 0
    const category = req.query.category || null
    if (req.user) {
        header.auth = true
        header.role = req.user.role
        header.username = req.user.username
    }
    try {
        const companies = await Company.getAllCompanies(pageSize)
        res.render('companies', { companies, header })
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
    getAllCompanies,
    getCompanyDetail,
    createCompany,
    deleteCompany
}