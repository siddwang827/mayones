$('#job-location').dropdown()
$('#job-type').dropdown()
$('#job-remote').dropdown()
$('#salary-type').dropdown();
$('#job-tags').dropdown({
    maxSelections: 4,
})
$('#job-position').dropdown()

$('#job-category').dropdown({
    action: 'activate',
    onChange: async function (text, value) {
        $(this).dropdown('set selected', value);
        $(this).dropdown('hide');
        const fetchResult = await fetch(`/api/1.0/positions?category=${value}`)
        const positions = await fetchResult.json()
        const jobContainer = $(`<div class="input-wrap" id="job-position-div"></div>`)
        const jobsSelection = $(`<select id="job-position" class="ui fluid search dropdown"><option value="">Position</option></select>`)
        positions.forEach(position => {
            jobsSelection.append($(`<option value="${position[1]}">${position[0]}</option>`))
        })
        jobContainer.append(jobsSelection)
        $('#job-position-div').replaceWith(jobContainer)
        $('#job-position').dropdown({
            action: 'activate',
            onChange: function (text, value) {
                $(this).dropdown('set selected', value);
                $(this).dropdown('hide');
            }
        })
        return
    }
})



$('#update-job-btn').on('click', async (event) => {
    event.preventDefault();
    event.stopPropagation()
    console.log($('#job-position').dropdown('get value'))
    if (!$('#job-title').val() || !$('#job-type').val() || !$('#job-location').val() || !$('#job-category').val()) {
        return alert('請填寫標示 * 符號之必填項目')
    }
    const jobForm = document.getElementById('job-form')
    const jobTags = $('#job-tags').dropdown('get value')
    const joblocation = $('#job-location').dropdown('get value')
    const jobCategory = $('#job-category').dropdown('get value')
    const jobPosition = $('#job-position').dropdown('get value')
    const jobRemote = $('#job-remote').dropdown('get value')
    const jobIntro = editorIntro.getData()
    const jobRequired = editorRequired.getData()
    const jobPrefer = editorPrefer.getData()
    const formData = new FormData(jobForm)

    formData.set('jobTags', JSON.stringify(jobTags))
    formData.set('joblocation', joblocation)
    formData.set('jobCategory', jobCategory)
    formData.set('jobRemote', jobRemote)
    formData.set('jobIntro', jobIntro)
    formData.set('jobRequired', jobRequired)
    formData.set('jobPrefer', jobPrefer)
    formData.set('jobPosition', jobPosition)

    const fetchResult = await fetch("/manage/job", {
        method: "POST",
        body: formData,
    })
    if (fetchResult.status === 200) {
        alert("已成功上傳職缺!")
        window.location.href = "/jobs"
    } else {
        alert("上傳職缺失敗!")
    }
});



