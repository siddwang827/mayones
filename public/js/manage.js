$(function () {
    $(".interview-date-input").daterangepicker({
        startDate: `${moment(Date.now()).format("MM/DD/YYYY")}`,
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 30,
        autoApply: true,
        locale: {
            format: "MM/DD/YYYY hh:mm",
        },
    });
});

$(".interview-date-picker").hide();

$(".calendar.icon").on("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const applicationId = event.target.getAttribute("application-id");
    $(`#interview-date-${applicationId}`).fadeToggle(150);
});

$(".invite-btn").on("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    $("#cover-spin").fadeToggle(200);
    const applicationId = event.target.getAttribute("application-id");
    const interviewDate = $(`#interview-date-input-${applicationId}`).val();
    const fetchResult = await fetch("/manage/invite", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            applicationId,
            action: {
                status: "arrange",
                interviewDate: moment(interviewDate).format("YYYY-MM-DD hh:mm"),
            },
        }),
    });

    if (fetchResult.status === 200) {
        alert("成功送出面試邀請！");
    } else {
        alert("送出面試邀請失敗！");
    }
    $("#cover-spin").fadeToggle(200);
});
