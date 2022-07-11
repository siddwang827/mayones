const followBtns = document.querySelectorAll('.follow')
followBtns.forEach(followBtn => followBtn.addEventListener('click', follow))
$('.button.application').on('click', application)

async function follow(event) {
    event.stopPropagation();
    event.preventDefault();
    const cookie = document.cookie
    if (!cookie) {
        alert('你目前尚未登入，請先登入！')
        window.location.href = '/employee/signin'
    }
    const jobId = event.target.getAttribute('job-id')
    const fetchResult = await fetch(`/api/1.0/follow`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jobId })
    })
    if (fetchResult.status === 403) {
        alert("您目前的身分無法收藏職缺！")
        return
    }
    const followBtns = document.querySelectorAll('.follow')
    followBtns.forEach(btn => {
        btn.classList.add("active")
        btn.innerText = "已收藏"
    })
}

async function application(event) {
    event.stopPropagation();
    event.preventDefault();
    const cookie = document.cookie
    if (!cookie) {
        alert('你目前尚未登入，請先登入！')
        window.location.href = '/employee/signin'
    }
    const jobId = event.target.getAttribute('job-id')
    const fetchResult = await fetch(`/application/${jobId}`, {
    })
    if (fetchResult.status === 200) {
        window.location.href = `/application/${jobId}`
    } else if (fetchResult.status === 403) {
        alert("您目前的身分無法應徵職缺！")
    } else {
        alert('你目前尚未登入，請先登入！')
        window.location.href = '/employee/signin'
    }
}
