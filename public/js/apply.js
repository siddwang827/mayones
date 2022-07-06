$('.ui.dropdown')
    .dropdown()
    ;

$('.item.resume').on('click', async (event) => {
    const resumeId = event.target.getAttribute('resume-id')

    const fetchResult = await fetch(`/api/1.0/resume/${resumeId}`)

    const resume = fetchResult.json()
    console.log(resume)
})