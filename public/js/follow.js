
const followJob = document.querySelectorAll('.follow-heart')
followJob.forEach(job => job.addEventListener('click', clickHeart))

async function clickHeart(event) {
    event.preventDefault();
    event.stopPropagation();
    const followId = event.target.getAttribute('follow-id')
    const fetchResult = await fetch(`/api/1.0/unfollow`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ followId })
    })
    window.location.href = '/api/1.0/follows'
}
