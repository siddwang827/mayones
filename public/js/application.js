const followJob = document.querySelectorAll('.follow-heart')
followJob.forEach(job => job.addEventListener('click', clickHeart))

async function clickHeart(event) {
    event.preventDefault();
    event.stopPropagation();
    const followId = event.target.getAttribute('follow-id')
    const type = event.target.getAttribute('follow-type')
    $(`#${type}-id-${followId}`).remove()
    const fetchResult = await fetch(`/api/1.0/follow/${type}/${followId}`, {
        method: 'DELETE'
    })
    // const result = await fetchResult.json()

    if ($('.follow-container.job').children().length === 0) {
        $('.follow-container.job').append($('<h2 style="text-align: center;">目前未收藏任何職缺!</h2>'))
    } else if ($('.follow-container.company').children().length === 0) {
        $('.follow-container.company').append($('<h2 style="text-align: center;">目前未收藏任何公司!</h2>'))
    }
}


$('.job-content.action').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
})


$('.calendar.icon').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation()
    if ($('.interview-date.hide').length !== 0) {
        $('.interview-date').removeClass('hide')
    } else {
        $('.interview-date').addClass('hide')
    }
})

$('.calendar.icon').hover(
    (event) => {
        event.preventDefault();
        event.stopPropagation()
        event.target.nextElementSibling.classList.remove('hide')
    },
    (event) => {
        event.preventDefault();
        event.stopPropagation();
        if ($('.interview-date.hide').length > 0) {
            event.target.nextElementSibling.classList.add('hide')
        }
    }
)


$('.thumbtack.icon').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation()
    if ($('.job-container.archived.hide').length !== 0) {
        $('.job-container.archived').removeClass('hide')
    } else {
        $('.job-container.archived').addClass('hide')
    }
})


$('.action-icon.archive').on('click', async (event) => {
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

$('.action-icon.trash').on('click', async (event) => {
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

$('.file.icon.action-icon').on('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const resumeId = event.target.getAttribute('application-id')
    const fetchResult = await fetch(`/api/1.0/resume/${resumeId}`)
    const resumeDetail = await fetchResult.json()
    console.log(resumeDetail)
    resumePreview(resumeDetail)
    $(`#resume-modal`)
        .modal({
            blurring: true
        })
        .modal('show')
        ;
})