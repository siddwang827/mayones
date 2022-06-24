const api = 'api/1.0';


let jobLocation = ["台北市", "新北市", "桃園市", "新竹市", "新竹縣", "台中市", "彰化縣", "嘉義市", "台南市", "高雄市", "花蓮縣", "海外"];
let jobCategory = {
    "軟體開發": ["後端工程", "前端工程", "全端工程", "測試工程", "遊戲開發", "行動裝置開發", "DevOp]s / SRE"],
}



// async function creatSearchBar() {

// }

async function getAllJobs() {
    const fetchResult = await fetch(`${api}/jobs`)
    const jobs = (await fetchResult.json()).data
    const container = $('.container')
    const jobsDiv = $('#jobs');

    if (jobs.length === 0) {
        jobsDiv.innerHTML = "查無搜尋的商品!"
    }
    else {
        for (let job of jobs) {
            const jobCard = $('<div class="job-card"></div>')
            const jobCardImg = $(`
            <div class="job-card-img">
                <a href="/job/${job.id}">
                    <img src="${job.banner_image}" alt="${job.brand}">
                </a>
            </div>
            `
            )
            const jobLine = $('<div class="line"></div>')
            const jobCardContent = $(`
            <div class="job-card-content">
                <div class="job-card-content-title">${job.title}</div>
                <a href="/company/${job.company_id}">
                    <div class="job-card-content-brand">${job.brand}</div>
                </a>
                <div class="job-card-content-location" >
                <svg width="16px" height="16px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2)"><path d="m6.5 16.5407715.6311176-.7118691c.71585099-.8191184 1.36011688-1.5983525 1.93279767-2.3377022l.4733382-.6239608c1.97516433-2.6615039 2.96274653-4.77276704 2.96274653-6.33378943 0-3.33218241-2.6862915-6.03344997-6-6.03344997s-6 2.70126756-6 6.03344997c0 1.56102239.98758218 3.67228553 2.96274653 6.33378943l.4733382.6239608c.73630387.9505925 1.5909423 1.9671163 2.56391527 3.0495713z"/><circle cx="6.5" cy="6.5" r="2.5"/></g></svg>
                    <a href="/jobs?location[]=${job.location}">${job.location}</a>
                </div>
                <div class="job-card-content-catergory">
                <svg width="16px" height="16px" viewBox="0 0 35 35" data-name="Layer 2" id="e73e2821-510d-456e-b3bd-9363037e93e3" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.933,15.055H3.479A3.232,3.232,0,0,1,.25,11.827V3.478A3.232,3.232,0,0,1,3.479.25h8.454a3.232,3.232,0,0,1,3.228,3.228v8.349A3.232,3.232,0,0,1,11.933,15.055ZM3.479,2.75a.73.73,0,0,0-.729.728v8.349a.73.73,0,0,0,.729.728h8.454a.729.729,0,0,0,.728-.728V3.478a.729.729,0,0,0-.728-.728Z"/><path d="M11.974,34.75H3.52A3.233,3.233,0,0,1,.291,31.521V23.173A3.232,3.232,0,0,1,3.52,19.945h8.454A3.232,3.232,0,0,1,15.2,23.173v8.348A3.232,3.232,0,0,1,11.974,34.75ZM3.52,22.445a.73.73,0,0,0-.729.728v8.348a.73.73,0,0,0,.729.729h8.454a.73.73,0,0,0,.728-.729V23.173a.729.729,0,0,0-.728-.728Z"/><path d="M31.522,34.75H23.068a3.233,3.233,0,0,1-3.229-3.229V23.173a3.232,3.232,0,0,1,3.229-3.228h8.454a3.232,3.232,0,0,1,3.228,3.228v8.348A3.232,3.232,0,0,1,31.522,34.75Zm-8.454-12.3a.73.73,0,0,0-.729.728v8.348a.73.73,0,0,0,.729.729h8.454a.73.73,0,0,0,.728-.729V23.173a.729.729,0,0,0-.728-.728Z"/><path d="M27.3,15.055a7.4,7.4,0,1,1,7.455-7.4A7.437,7.437,0,0,1,27.3,15.055Zm0-12.3a4.9,4.9,0,1,0,4.955,4.9A4.935,4.935,0,0,0,27.3,2.75Z"/>
                </svg>
                    <a class="job-card-category-item" href="/jobs?category[]=${job.category}">${job.category}</a>
                    <a class="job-card-category-item" href="/jobs?position[]=${job.position}">${job.position}</a>
                    </div>
            </div>`)
            const jobTags = $(
                `<div class="job-card-content-tags" >
                    <svg width="16px" height="16px" viewBox="0 0 32 32" id="i-tag" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <circle cx="24" cy="8" r="2" />
                        <path d="M2 18 L18 2 30 2 30 14 14 30 Z" />
                    </svg>
                </div>`
            )

            for (let tag of job.tags) {
                const jobTag = $(`<a class="job-tag">${tag}</a>`)
                jobTags.append(jobTag)
            }
            jobCardContent.append(jobTags)
            jobCard.append(jobCardImg, jobLine, jobCardContent)
            jobsDiv.append(jobCard)
        }

    }
    container.append(jobsDiv)
}

getAllJobs()