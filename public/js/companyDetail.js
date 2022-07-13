const api = 'api/1.0';


async function checkCompanyAllJobs() {
    const company = $('h1')[0].outerText.replaceAll(' ', '%20')
    console.log(company)
    window.location = `/jobs?company[]=${company}`
    return
}

$('.all-jobs-btn').on('click', checkCompanyAllJobs)