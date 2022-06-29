const followBtns = document.querySelectorAll('.follow')
followBtns.forEach(followBtn => followBtn.addEventListener('click', follow))


async function follow(event) {
    event.stopPropagation();
    event.preventDefault();
    const jobId = event.target.getAttribute('job-id')
    const fetchResult = await fetch(`/api/1.0/follow`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jobId })
    })

}
