const api = 'api/1.0';


async function getcompanyDetail() {
    const url = new URL(window.location)
    const id = url.searchParams.get('id')
    const restUrl = `${url.origin}/company/${id}`
    history.pushState('', '', restUrl)
    const fetchResult = await fetch(`${api}/company/${id}`)
    const companyDetail = await fetchResult.json()
    console.log(companyDetail)
}

getcompanyDetail()