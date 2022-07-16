$(function () {
    $('.interview-date-input').daterangepicker({
        startDate: "07/09/2022",
        endDate: "07/15/2022",
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 30,
        autoApply: true,
        locale: {
            format: 'MM/DD/YYYY hh:mm'
        }
    });
});

$('.interview-date-picker').hide()

$('.calendar.icon').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation()
    const applicationId = event.target.getAttribute('application-id')
    $(`#interview-date-${applicationId}`).fadeToggle(150)

})

$('.invite-btn').on('click', async (event) => {
    event.preventDefault();
    event.stopPropagation()
    const applicationId = event.target.getAttribute('application-id')
    const interviewDate = $(`#interview-date-input-${applicationId}`).val()
    console.log(moment(interviewDate).format('YYYY-MM-DD hh:mm:ss'))
    const fetchResult = await fetch('/manage/invite', {
        method: "POST",
        headers:
            { 'content-type': 'application/json' },
        body: JSON.stringify({
            applicationId,
            action: {
                status: 'arrange',
                interviewDate: moment(interviewDate).format('YYYY-MM-DD hh:mm:ss')
            }
        })
    })

    if (fetchResult.status === 200) {
        alert('成功送出面試邀請！')
    } else {
        alert('送出面試邀請失敗！')
    }
})
