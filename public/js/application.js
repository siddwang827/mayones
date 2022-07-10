
const followJob = document.querySelectorAll('.follow-heart')
followJob.forEach(job => job.addEventListener('click', clickHeart))

async function clickHeart(event) {
    event.preventDefault();
    event.stopPropagation();
    const followId = event.target.getAttribute('follow-id')
    const fetchResult = await fetch(`/api/1.0/follow/${followId}`, {
        method: 'DELETE'
    })
    const result = await fetchResult.json()
    if (result.result) {
        const jobId = event.target.getAttribute('follow-id')
        $(`#job-id-${jobId}`).remove()
    }
    if ($('.job-container').children().length === 0) {
        $('.job-container').append($('<h1 style="text-align: center;">您目前未收藏任何職缺!</h1>'))
    }
}

$('.job-content.action').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
})


$('.calendar.icon').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation()
    if ($('.hide').length !== 0) {
        $('.interview-date').removeClass('hide')
    } else {
        $('.interview-date').addClass('hide')
    }


})


$('.action-item.archive').on('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const applicationId = event.target.getAttribute('application-id')
    const action = "archive"
    const check = confirm('是否要封存此應徵紀錄')
    if (check) {
        const fetchResult = await fetch('/api/1.0/application',
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    applicationId,
                    action
                })
            })

        if (fetchResult.status === 200) {
            alert('已封存此筆應徵紀錄！')
            window.location.href = '/applications'
        } else if (fetchResult.status === 403) {
            alert('您沒有權限修改此應徵紀錄！')
        } else {
            alert('封存此筆記錄失敗，請稍後嘗試！')
        }
    }


})

$('.action-item.trash').on('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const applicationId = event.target.getAttribute('application-id')
    const check = confirm('是否要取消此應徵紀錄')
    if (check) {
        const fetchResult = await fetch(`/api/1.0/application/${applicationId}`,
            {
                method: "DELETE",
            })
        if (fetchResult.status === 200) {
            alert('已刪除此職缺的應徵紀錄！')
            window.location.href = '/applications'
        } else if (fetchResult.status === 403) {
            alert('您沒有權限修改此應徵紀錄！')
        } else {
            alert('刪除應徵紀錄失敗，請稍後嘗試！')
        }
    }

})