const { Company, companyLocations } = require('../models/company_model')
const { thoundsAddComma } = require('../../utils/utils')
const pageSize = 20


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


const getCompanyDetail = async (req, res) => {
    const header = req.header
    const companyId = req.params.id
    let userInfo = { role: null }
    if (req.user) {
        const { role, id } = req.user
        userInfo = { role, id }
    }

    try {
        const companyDetail = await Company.getCompanyDetailById(companyId, userInfo)
        res.render('companyDetail', { companyDetail, thoundsAddComma, header })
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}



module.exports = {
    getCompanies,
    getCompanyDetail,
}
