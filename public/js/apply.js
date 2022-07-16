$('.ui.dropdown')
    .dropdown()
    ;

$('.item.resume').on('click', async (event) => {
    const resumeId = event.target.getAttribute('resume-id')
    const fetchResult = await fetch(`/api/1.0/resume/${resumeId}`)
    const resume = await fetchResult.json()
    localStorage.setItem('resumeId', resumeId)
    // if (resume)
    resumePreview(resume)
})

function resumePreview(resumeDetail) {

    if ($('#resume-preview')) {
        $('#resume-preview').remove()
    }

    let bioDiv, skillsDivs, projectDivs, experienceDivs, educationDivs, skillContainer, projectContainer, experienceContainer, educationContainer

    const container = $('#container')
    const resumeDiv = $(`<div class="resume-item" id="resume-preview"></div>`)
    const resumeContainer = $(`<div class="resume-preview-container"></div>`)

    const basicInfoContainer = $(`
        <div class="resume-preview-row basic-info">
        </div>
    `)

    const userNameDiv = $(` 
        <div class="resume-preview-title name">
            ${resumeDetail.user_name}
        </div>
    `)

    const profileDiv = $(`
        <div class="resume-preview-content profile">
        </div>
    `)

    const genderDiv = $(`
        <div class="resume-preview-content-item">
            <i class="user icon"></i>
            <div id="gender" class="profile-content">${resumeDetail.gender}</div>
        </div>
    `)

    const birthdayDiv = $(`
        <div class="resume-preview-content-item">
            <i class="birthday cake icon"></i>
            <div id="birthday" class="profile-content">${moment(resumeDetail.birthday).format('YYYY-MM-DD')}</div>
        </div>
    `)

    const phoneDiv = $(`
        <div class="resume-preview-content-item">
            <i class="phone icon"></i>
            <div id="phone" class="profile-content">${resumeDetail.phone}</div>
        </div>
    `)

    const contacEmailDiv = $(` 
        <div class="resume-preview-content-item">
        <i class="envelope icon"></i>
        <div id="contact-email" class="profile-content">${resumeDetail.contact_email}</div>
        </div>
    `)

    const websiteDiv = $(`
        <div class="resume-preview-content-item">
            <i class="globe icon"></i>
            <a href="${resumeDetail.personal_url}">
                <div id="website" class="profile-content">${resumeDetail.personal_url}</div>
            </a>
        </div>
    `)

    if (resumeDetail.bio) {
        bioDiv = $(`
            <div class="resume-preview-row detail-info">
                <div class="resume-preview-title bio">
                    簡歷 <span class="title-en">Bio</span>
                </div>
                <div class="resume-preview-content-item">
                    ${resumeDetail.bio.replaceAll('\\r\\n', '<br/>')}
                </div>
            </div>
        `)
    }



    if (resumeDetail.skill_name[0]) {
        skillContainer = $(`
            <div class="resume-preview-row detail-info">
                <div class="resume-preview-title skills">
                    專業技能 <span class="title-en">Skills</span>
                </div>
            </div>
        `)

        skillsDivs = resumeDetail.skill_name.map((skill, index) => {
            return $(`
                <div class="profile-content">
                    <div class="resume-preview-content-item">
                        <i class="check circle icon"></i>
                        <div class="skill-name">${skill}</div>
                        <div class="skill-proficiency">
                        ${resumeDetail.skill_proficiency[index]} 
                        ${resumeDetail.skill_proficiency[index] === '初階' ? 'Beginner' : resumeDetail.skill_proficiency[index] === '熟練' ? 'Advanced' : 'Expert'}</div>
                    </div>
                    <div class="resume-preview-content-item">
                        <div class="skill-intro">${resumeDetail.skill_intro[index] ? resumeDetail.skill_intro[index] : ""}</div>
                    </div>
                </div>
            `)
        })

        skillsDivs.forEach((skill) => {
            skillContainer.append(skill)
        })
    }

    if (resumeDetail.project_title[0]) {
        projectContainer = $(`
            <div class="resume-preview-row detail-info">
                <div class="resume-preview-title skills">
                    專案作品 <span class="title-en">Portfolios</span>
                </div>
            </div>
        `)

        projectDivs = resumeDetail.project_title.map((project, index) => {
            return $(`
                <div class="profile-content  project">
                    <div class="project-col project-info">
                        <div class="resume-preview-content-item">
                            <i class="linkify icon"></i>
                            <a href="${resumeDetail.project_link[index] ? resumeDetail.project_link[index] : ""}">
                                <div class="project-title">${project}</div>
                            </a>
                        </div>
                        <div class="resume-preview-content-item">
                            <div class="skill-intro">
                                ${resumeDetail.project_intro[index] ? resumeDetail.project_intro[index].replaceAll('\\r\\n', '<br/>') : ""}
                            </div>
                        </div>
                    </div>
                    <div class="project-col" style="background: url(${resumeDetail.project_image[index] ? resumeDetail.project_image[index] : "/img/default.jpg"}); background-size: contain; height: 185px; width: 280px; background-position: center; background-repeat: no-repeat;">

                    </div>
                </div>
            `)
        })

        projectDivs.forEach((project) => {
            projectContainer.append(project)
        })
    }


    if (resumeDetail.experience_title[0]) {
        experienceContainer = $(`
            <div class="resume-preview-row detail-info">
                <div class="resume-preview-title experience">
                    工作經歷 <span class="title-en">Experience</span>
                </div>
            </div>
        `)

        experienceDivs = resumeDetail.experience_title.map((experience, index) => {
            return $(`
            <div class="profile-content experience">
                <div class="resume-preview-content-item title">
                    <i class="circle icon"></i>
                    <div class="experience-position">${experience}</div>
                    <div class="experience-org">${resumeDetail.experience_org[index] ? resumeDetail.experience_org[index] : ""}</div>
                    <div class="experience-period">${resumeDetail.experience_start[index]} ~ ${resumeDetail.experience_end[index]}</div>
                </div>
                <div class="resume-preview-content-item">
                    <div class="experience-intro">
                        ${resumeDetail.experience_intro[index] ? resumeDetail.experience_intro[index].replaceAll('\\r\\n', '<br/>') : ""}
                    </div>
                </div>
            </div>
        `)
        })

        experienceDivs.forEach((experience) => {
            experienceContainer.append(experience)
        })
    }


    if (resumeDetail.education_title[0]) {
        educationContainer = $(`
            <div class="resume-preview-row detail-info">
                <div class="resume-preview-title education">
                    學歷 <span class="title-en">Education</span>
                </div>
            </div>
        `)

        educationDivs = resumeDetail.education_title.map((education, index) => {
            return $(`
            <div class="profile-content education">
                <div class="resume-preview-content-item title">
                    <i class="book icon"></i>
                    <div class="education-title">${education}</div>
                    <div class="education-period">
                    ${resumeDetail.education_start[index] ? resumeDetail.education_start[index] : ""}
                    ~ ${resumeDetail.education_end[index] ? resumeDetail.education_end[index] : ""}</div>
                </div>
                <div class="resume-preview-content-item">
                    <div class="education-department">
                        ${resumeDetail.education_department[index] ? resumeDetail.education_department[index] : ""}
                    </div>
                    <div class="education-degree">
                        ${resumeDetail.education_degree[index] ? resumeDetail.education_degree[index] : ""}
                    </div>
                </div>
            </div>
        `)
        })

        educationDivs.forEach((education) => {
            educationContainer.append(education)
        })
    }

    const profileInfo = [genderDiv, birthdayDiv, phoneDiv, contacEmailDiv, websiteDiv]
    const otherInfo = [skillContainer, projectContainer, experienceContainer, educationContainer]

    profileInfo.forEach(info => {
        switch (info) {
            case genderDiv:
                if (resumeDetail.gender && resumeDetail.gender !== "hidden") {
                    profileDiv.append(info)
                } break;

            case birthdayDiv:
                if (resumeDetail.show_birthday === 1 && resumeDetail.birthday) {
                    profileDiv.append(info)
                } break;

            case phoneDiv:
                if (resumeDetail.phone !== "") {
                    profileDiv.append(info)
                } break;

            case contacEmailDiv:
                profileDiv.append(info)
                break;

            case websiteDiv:
                if (resumeDetail.personal_url !== "") {
                    profileDiv.append(info)
                } break;

        }
    })

    basicInfoContainer.append(userNameDiv, profileDiv)
    resumeContainer.append(basicInfoContainer, bioDiv)
    otherInfo.forEach(info => {
        if (info) { resumeContainer.append(info) }
    })
    resumeDiv.append(resumeContainer)
    container.append(resumeDiv)

}

$('#apply-btn').on('click', async (event) => {
    if ($('.selected.active').length === 0 || $('#resume-preview').length === 0) {
        alert('請選擇欲投遞此職缺之履歷！')
        return
    }
    const checkApply = confirm('確認是否投遞履歷？')
    if (!checkApply) {
        return
    }
    const jobId = window.location.pathname.split('/')[2]
    const resumeId = localStorage.getItem('resumeId')

    const fetchResult = await fetch('/api/1.0/application', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jobId,
            resumeId
        })
    })

    await fetchResult.json()
    if (fetchResult.status === 200) {
        alert("履歷投遞成功！")
        window.location.href = "/applications"
    } else if (fetchResult.status === 403) {
        alert("您已應徵過該職缺，請查看應徵紀錄！")
        window.location.href = "/applications"
    } else {
        alert("履歷投遞失敗，請稍後重試！")
    }
})