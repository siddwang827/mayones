const Company = require('../models/company_model')
const pageSize = 20



const getAllCompanies = async (req, res) => {
    const paging = parseInt(req.query.paging) || 0
    const category = req.query.category || null
    try {
        const result = await Company.getAllCompanies(pageSize)
        res.status(200).send({ data: result })
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
    const companyId = req.params.id
    const result = Company.getCompanyDetailById(companyId)

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
