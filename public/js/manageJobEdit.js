async function getPositionANDJobText() {
    const jobId = $('#job-title').attr('job-id')
    const fetchPosition = await fetch(`/api/1.0/job-textarea?id=${jobId}`)
    const result = await fetchPosition.json()
    editorIntro.setData(result.jobTextarea[0].job_description)
    editorRequired.setData(result.jobTextarea[0].skill_required)
    editorPrefer.setData(result.jobTextarea[0].prefered_qualification)

}


getPositionANDJobText()