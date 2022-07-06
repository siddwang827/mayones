const column = document.querySelector('.container');

new Sortable(column, {
    sort: true,
    animation: 150,
    ghostClass: 'on-dragging',
    draggable: ".draggable",
    forceFallback: true,
});

$('.ui.dropdown')
    .dropdown()
    ;

$('.icon-edit').on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const modalId = $(e.target).attr('modal-id')
    $(`#${modalId}`)
        .modal({
            blurring: true
        })
        .modal('show')
        ;
})

$('.ui.confirm-btn').on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $('.modal').modal('hide')
})

$('#add-skill-btn').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation()
    const skillsDOM = $('.resume-content.skill')
    const index = skillsDOM.length ? parseInt(skillsDOM[skillsDOM.length - 1].getAttribute('skill-index')) + 1 : 0
    const property = 'skill'
    $('#resume-skill-list').append($(`
        <div id="skill-item-${index}" class="resume-content skill" skill-index=${index}>
            <div class="content-container">
                <div class="form-group skill">
                    <label for="skill-name-${index}">技能名稱</label>
                    <div class="input-wrap">
                        <input name="skillName" class="form-control" id="skill-name-${index}" >
                    </div>
                </div>
                <div class="form-group skill">
                    <label for="skill-proficiency-${index}">熟練程度</label>
                    <div class="input-wrap">
                        <select class="ui dropdown select" name="skillProficiency" id="skill-proficiency-${index}">
                            <option value="beginner">初階</option>
                            <option value="intermediate">熟練</option>
                            <option value="expert">精通</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="skill-info-${index}">技能描述</label>
                <div class="input-wrap">
                    <textarea name="skillInfo" class="form-control" id="skill-info-${index}" rows=1 value=""></textarea>
                </div>
            </div>
            <div class="remove-btn">
                <button class="ui medium negative button" id="remove-skill-btn-${index}" skill-index="${index}">刪除</button>
            </div>
        </div>
    `))

    $(`#remove-skill-btn-${index}`).on('click', function (event) {
        removeDOM(event, property)
    })
})

$('#add-project-btn').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation()
    const projectsDOM = $('.resume-content.project')
    const index = projectsDOM.length ? parseInt(projectsDOM[projectsDOM.length - 1].getAttribute('project-index')) + 1 : 0
    const property = 'project'

    $('#resume-project-list').append($(`
    <div id="project-item-${index}" class="resume-content project col" project-index=${index}">
        <div class="content-container">    
            <div class="content-container-col">
                <div class="form-group">
                    <label for="project-title-${index}">專案名稱</label>
                    <div class="input-wrap">
                        <input name="projectTitle" class="form-control" id="project-title-${index}"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="project-link-${index}">專案連結</label>
                    <div class="input-wrap">
                        <input name="projectLink" class="form-control" id="project-link-${index}"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="project-info-${index}">專案描述</label>
                    <div class="input-wrap">
                        <textarea name="projectInfo" class="form-control" id="project-info-${index}" rows=1></textarea>
                    </div>
                </div>
            </div>
            <div class="image-upload-wrap" id="image-upload-wrap-${index}">
                <input class="file-upload-input" name="projectImage" id="project-image-${index}" project-index="${index}" type='file' onchange="readURL(this);" accept="image/*" />
                <div class="drag-text">
                    <p>Drag and drop a file or select add Image</p>
                </div>
            </div>
            <div class="file-upload-content" id="file-upload-content-${index}">
                <img id="file-upload-image-${index}" class="file-upload-image" project-index="${index}" src="#" alt="your image" />
                <div class="image-title-wrap">
                    <button type="button" id="remove-image-btn-${index}" class="remove-image" project-index="${index}">Remove <span id="image-title-${index}" class="image-title">Uploaded
                            Image</span></button>
                </div>
            </div>
        </div>
        <div class="remove-btn">
                <button class="ui medium negative button" id="remove-project-btn-${index}" project-index="${index}">刪除</button>
        </div>
    </div>
    `))

    $(`#remove-project-btn-${index}`).on('click', function (event) {
        removeDOM(event, property)
    })
    $(`#remove-image-btn-${index}`).on('click', removeUpload)
})

$('#add-experience-btn').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation()
    const experienceDOM = $('.resume-content.experience')
    const index = experienceDOM.length ? parseInt(experienceDOM[experienceDOM.length - 1].getAttribute('experience-index')) + 1 : 0
    const property = 'experience'

    $('#resume-experience-list').append($(`
    <div id="experience-item-${index}" class="resume-content experience" experience-index="${index}">
        <div class="content-container experience">
            <div class="form-group">
                <label for="experience-title-${index}">職位</label>
                <div class="input-wrap">
                    <input name="experienceName" class="form-control" id="experience-title-${index}">
                </div>
            </div>
            <div class="form-group">
                <label for="experience-company-name-${index}">組織名稱</label>
                <div class="input-wrap">
                    <input name="experienceCompanyName" class="form-control" id="experience-company-name-${index}">
                </div>
            </div>
            <div class="form-group">
                <label for="experience-time-start-${index}">起始時間</label>
                <div class="input-wrap">
                    <input name="experienceTimeStart" class="form-control" id="experience-time-start-${index}" type="month">
                </div>
            </div>
            <div class="form-group">
                <label for="experience-time-end-${index}">結束時間</label>
                <div class="input-wrap">
                    <input name="experienceTimeEnd" class="form-control" id="experience-time-end-${index}" type="month">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="experience-info-${index}">內容描述</label>
            <div class="input-wrap">
                <textarea name="experienceInfo" class="form-control" id="experience-info-${index}" rows=1></textarea>
            </div>
        </div>
        <div class="remove-btn">
            <button class="ui medium negative button" id="remove-experience-btn-${index}" experience-index="${index}">刪除</button>
        </div>
    </div>
    `))

    $(`#remove-experience-btn-${index}`).on('click', function (event) {
        removeDOM(event, property)
    })
})

$('#add-education-btn').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation()
    const educationDOM = $('.resume-content.education')
    const index = educationDOM.length ? parseInt(educationDOM[educationDOM.length - 1].getAttribute('education-index')) + 1 : 0
    const property = 'education'

    $('#resume-education-list').append($(`
    <div id="education-item-${index}" class="resume-content education" education-index="${index}">
        <div class="form-group">
            <label for="education-title-${index}">學校名稱</label>
            <div class="input-wrap">
                <input name="educationName" class="form-control" id="education-title-${index}">
            </div>
        </div>
        <div class="content-container education">
            <div class="form-group">
                <label for="education-department-${index}">系所</label>
                <div class="input-wrap">
                    <input name="educationDepartment" class="form-control" id="education-department-${index}">
                </div>
            </div>
            <div class="form-group">
                <label for="education-degree-${index}">學位</label>
                <div class="input-wrap">
                    <input name="educationDegree" class="form-control" id="education-degree-${index}">
                </div>
            </div>
            <div class="form-group">
                <label for="education-time-start-${index}">起始時間</label>
                <div class="input-wrap">
                    <input name="educationTimeStart" class="form-control" id="education-time-start-${index}" type="month">
                </div>
            </div>
            <div class="form-group">
                <label for="education-time-end-${index}">結束時間</label>
                <div class="input-wrap">
                    <input name="educationTimeEnd" class="form-control" id="education-time-end-${index}" type="month">
                </div>
            </div>
        </div>
        <div class="remove-btn">
            <button class="ui medium negative button" id="remove-education-btn-${index}" education-index="${index}">刪除</button>
        </div>
    </div>
    `))

    $(`#remove-education-btn-${index}`).on('click', function (event) {
        removeDOM(event, property)
    })
})

document.querySelectorAll('.ui.medium.negative.button').forEach(ele => {
    ele.addEventListener('click', function (event) {
        const property = event.target.getAttribute('id').split('-')[1]
        removeDOM(event, property)
    })
})

function removeDOM(e, property) {
    e.preventDefault()
    const index = e.target.getAttribute(`${property}-index`)
    $(`#${property}-item-${index}`).remove()
}

function readURL(input) {
    if (input.files && input.files[0]) {
        const index = input.getAttribute('project-index')
        let reader = new FileReader();

        reader.onload = function (e) {
            $(`#image-upload-wrap-${index}`).hide();
            $(`#file-upload-image-${index}`).attr('src', e.target.result);
            $(`#file-upload-content-${index}`).show();
            $(`#image-title-${index}`).html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload(input) {
    const imageIndex = input.target.getAttribute('project-index')

    $(`#project-image-${imageIndex}`).replaceWith($(`#project-image-${imageIndex}`).clone());
    $(`#file-upload-content-${imageIndex}`).hide();
    $(`#image-upload-wrap-${imageIndex}`).show();
    $(`#project-image-${imageIndex}`).val('')
}


$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});


$('#update-resume-btn').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation()
    if (!$('#resume-name').val() || !$('#name').val() || !$('#contactEmail').val()) {
        return alert('請填寫標示 * 符號之必填項目')
    }
    const resumeForm = document.getElementById('resume-form')
    const formData = new FormData(resumeForm)

    fetch("/resume", {
        method: "POST",
        body: formData,
    })
        .then(console.log("send to server sucess!"))
        .catch((err) => {
            console.log(err);
        });
});
