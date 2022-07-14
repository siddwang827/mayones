const api = 'api/1.0';

$('.follow').on('click', follow)
$('.followed').on('click', unfollow)
$('.all-jobs-btn').on('click', checkCompanyAllJobs)

async function follow(event) {
    event.stopPropagation();
    event.preventDefault();
    const cookie = document.cookie
    if (!cookie) {
        alert('你目前尚未登入，請先登入！')
        window.location.href = '/employee/signin'
    }
    const companyId = event.target.getAttribute('company-id')
    const fetchResult = await fetch(`/api/1.0/follow`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            'type': 'company',
            'id': companyId
        })
    })
    if (fetchResult.status === 403) {
        alert("您目前的身分無法收藏職缺！")
        return
    }
    const followId = await fetchResult.json()
    $('.follow').replaceWith($(`
        <button class="huge ui red button followed" follow-id=${followId.id}>
            已收藏
        </button>`))
    $('.followed').on('click', unfollow)
}

async function unfollow(event) {
    event.preventDefault();
    event.stopPropagation();
    const followId = event.target.getAttribute('follow-id')
    await fetch(`/api/1.0/follow/company/${followId}`, {
        method: 'DELETE'
    })
    const companyId = $('.all-jobs-btn').attr('company-id')

    $('.followed').replaceWith($(`
        <button class="huge ui inverted red button follow" company-id=${companyId}>
            <i class="heart outline icon"></i>
            加入收藏
        </button>`))
    $('.follow').on('click', follow)
}

async function checkCompanyAllJobs() {

    const company = $('h1')[0].outerText.replaceAll(' ', '%20')
    window.location = `/jobs?company[]=${company}`
}
