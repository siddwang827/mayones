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

$('.invite-btn').on('click', () => {

})