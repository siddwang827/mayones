const column = document.querySelector(".right-resume-container");

new Sortable(column, {
    sort: true,
    animation: 150,
    ghostClass: "on-dragging",
    draggable: ".draggable",
    filter: ".fixed",
    forceFallback: true,
});

$(".ui.dropdown").dropdown();

$(".icon-edit").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const modalId = $(e.target).attr("modal-id");
    $(`#${modalId}`)
        .modal({
            blurring: true,
        })
        .modal("show");
});

$(".ui.confirm-btn").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    $(".modal").modal("hide");
});

$("#add-skill-btn").on("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const skillsDOM = $(".resume-content.new.skill");
    const index = skillsDOM.length ? parseInt(skillsDOM[skillsDOM.length - 1].getAttribute("skill-index").split("-")[1]) + 1 : 0;
    const skillIndex = `new-${index}`;
    const property = "skill";
    $("#resume-skill-list").append(
        $(`
        <div id="skill-item-${skillIndex}" class="resume-content new skill" skill-index=${skillIndex}>
            <div class="content-container">
                <div class="form-group skill">
                    <label for="skill-name-${skillIndex}">技能名稱</label>
                    <div class="input-wrap">
                        <input name="skillName" class="form-control" id="skill-name-${skillIndex}" >
                    </div>
                </div>
                <div class="form-group skill">
                    <label for="skill-proficiency-${skillIndex}">熟練程度</label>
                    <div class="input-wrap">
                        <select class="ui dropdown select" name="skillProficiency" id="skill-proficiency-${skillIndex}">
                            <option value="初階">初階</option>
                            <option value="熟練">熟練</option>
                            <option value="精通">精通</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="skill-info-${skillIndex}">技能描述</label>
                <div class="input-wrap">
                    <textarea name="skillInfo" class="form-control" id="skill-info-${skillIndex}" rows=1 value=""></textarea>
                </div>
            </div>
            <div class="remove-btn">
                <button class="ui medium negative button" id="remove-skill-btn-${skillIndex}" skill-index="${skillIndex}">刪除</button>
            </div>
        </div>
    `)
    );

    $(`#remove-skill-btn-${skillIndex}`).on("click", function (event) {
        removeDOM(event, property);
    });
});

$("#add-project-btn").on("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const projectsDOM = $(".resume-content.new.project");
    let index = projectsDOM.length ? parseInt(projectsDOM[projectsDOM.length - 1].getAttribute("project-index").split("-")[1]) + 1 : 0;
    const projectIndex = `new-${index}`;
    const property = "project";

    $("#resume-project-list").append(
        $(`
    <div id="project-item-${projectIndex}" class="resume-content new project col" project-index="${projectIndex}">
        <div class="content-container">    
            <div class="content-container-col">
                <div class="form-group">
                    <label for="project-title-${projectIndex}">專案名稱</label>
                    <div class="input-wrap">
                        <input name="projectTitle" class="form-control" id="project-title-${projectIndex}"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="project-link-${projectIndex}">專案連結</label>
                    <div class="input-wrap">
                        <input name="projectLink" class="form-control" id="project-link-${projectIndex}"></input>
                    </div>
                </div>
                <div class="form-group">
                    <label for="project-info-${projectIndex}">專案描述</label>
                    <div class="input-wrap">
                        <textarea name="projectInfo" class="form-control" id="project-info-${projectIndex}" rows=1></textarea>
                    </div>
                </div>
            </div>
            <div class="image-upload-wrap" id="image-upload-wrap-${projectIndex}">
                <input class="file-upload-input" name="projectImage" id="project-image-${projectIndex}" project-index="${projectIndex}" type='file' onchange="readURL(this);" accept="image/*" />
                <div class="drag-text">
                    <p>Drag and drop a file or select add Image</p>
                </div>
            </div>
            <div class="file-upload-content" id="file-upload-content-${projectIndex}">
                <img id="file-upload-image-${projectIndex}" class="file-upload-image" project-index="${projectIndex}" src="#" alt="your image" />
                <div class="image-title-wrap">
                    <button type="button" id="remove-image-btn-${projectIndex}" class="remove-image" project-index="${projectIndex}">Remove <span id="image-title-${projectIndex}" class="image-title">Uploaded
                            Image</span></button>
                </div>
            </div>
        </div>
        <div class="remove-btn">
                <button class="ui medium negative button" id="remove-project-btn-${projectIndex}" project-index="${projectIndex}">刪除</button>
        </div>
    </div>
    `)
    );

    $(`#remove-project-btn-${projectIndex}`).on("click", (event) => {
        removeDOM(event, property);
    });
    $(`#remove-image-btn-${projectIndex}`).on("click", (event) => {
        removeUpload(event);
    });
});

$("#add-experience-btn").on("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const experienceDOM = $(".resume-content.new.experience");
    const index = experienceDOM.length ? parseInt(experienceDOM[experienceDOM.length - 1].getAttribute("experience-index").split("-")[1]) + 1 : 0;
    const experienceIndex = `new-${index}`;
    const property = "experience";

    $("#resume-experience-list").append(
        $(`
    <div id="experience-item-${experienceIndex}" class="resume-content new experience" experience-index="${experienceIndex}">
        <div class="content-container experience">
            <div class="form-group">
                <label for="experience-title-${experienceIndex}">職位</label>
                <div class="input-wrap">
                    <input name="experienceName" class="form-control" id="experience-title-${experienceIndex}">
                </div>
            </div>
            <div class="form-group">
                <label for="experience-company-name-${experienceIndex}">組織名稱</label>
                <div class="input-wrap">
                    <input name="experienceCompanyName" class="form-control" id="experience-company-name-${experienceIndex}">
                </div>
            </div>
            <div class="form-group">
                <label for="experience-time-start-${experienceIndex}">起始時間</label>
                <div class="input-wrap">
                    <input name="experienceTimeStart" class="form-control" id="experience-time-start-${experienceIndex}" type="month">
                </div>
            </div>
            <div class="form-group">
                <label for="experience-time-end-${experienceIndex}">結束時間</label>
                <div class="input-wrap">
                    <input name="experienceTimeEnd" class="form-control" id="experience-time-end-${experienceIndex}" type="month">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="experience-info-${experienceIndex}">內容描述</label>
            <div class="input-wrap">
                <textarea name="experienceInfo" class="form-control" id="experience-info-${experienceIndex}" rows=1></textarea>
            </div>
        </div>
        <div class="remove-btn">
            <button class="ui medium negative button" id="remove-experience-btn-${experienceIndex}" experience-index="${experienceIndex}">刪除</button>
        </div>
    </div>
    `)
    );

    $(`#remove-experience-btn-${experienceIndex}`).on("click", function (event) {
        removeDOM(event, property);
    });
});

$("#add-education-btn").on("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const educationDOM = $(".resume-content.new.education");
    const index = educationDOM.length ? parseInt(educationDOM[educationDOM.length - 1].getAttribute("education-index").split("-")[1]) + 1 : 0;
    const educationIndex = `new-${index}`;
    const property = "education";

    $("#resume-education-list").append(
        $(`
    <div id="education-item-${educationIndex}" class="resume-content new education" education-index="${educationIndex}">
        <div class="form-group">
            <label for="education-title-${educationIndex}">學校名稱</label>
            <div class="input-wrap">
                <input name="educationName" class="form-control" id="education-title-${educationIndex}">
            </div>
        </div>
        <div class="content-container education">
            <div class="form-group">
                <label for="education-department-${educationIndex}">系所</label>
                <div class="input-wrap">
                    <input name="educationDepartment" class="form-control" id="education-department-${educationIndex}">
                </div>
            </div>
            <div class="form-group">
                <label for="education-degree-${educationIndex}">學位</label>
                <div class="input-wrap">
                    <input name="educationDegree" class="form-control" id="education-degree-${educationIndex}">
                </div>
            </div>
            <div class="form-group">
                <label for="education-time-start-${educationIndex}">起始時間</label>
                <div class="input-wrap">
                    <input name="educationTimeStart" class="form-control" id="education-time-start-${educationIndex}" type="month">
                </div>
            </div>
            <div class="form-group">
                <label for="education-time-end-${educationIndex}">結束時間</label>
                <div class="input-wrap">
                    <input name="educationTimeEnd" class="form-control" id="education-time-end-${educationIndex}" type="month">
                </div>
            </div>
        </div>
        <div class="remove-btn">
            <button class="ui medium negative button" id="remove-education-btn-${educationIndex}" education-index="${educationIndex}">刪除</button>
        </div>
    </div>
    `)
    );

    $(`#remove-education-btn-${educationIndex}`).on("click", function (event) {
        removeDOM(event, property);
    });
});

$(".ui.medium.negative.button").on("click", removeDomAndFetchDB);

$(".remove-image").on("click", removeUpload);

// document.querySelectorAll('.remove-image').forEach(ele => {
//     ele.addEventListener('click', removeUpload)
// })

function removeDOM(event, property) {
    event.preventDefault();
    const index = event.target.getAttribute(`${property}-index`);
    $(`#${property}-item-${index}`).remove();
}

async function removeDomAndFetchDB(event) {
    event.preventDefault();
    event.stopPropagation();
    $("#cover-spin").show(0);
    const property = event.target.getAttribute("property");
    const id = event.target.getAttribute(`${property}-index`);
    const fetchResult = await fetch(`/api/1.0/${property}/${id}`, { method: "DELETE" });
    $("#cover-spin").hide(0);
    if (fetchResult.status === 200) {
        alert("刪除成功");
    } else {
        alert("刪除失敗");
    }
    $(`#${property}-item-${id}`).remove();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        const index = input.getAttribute("project-index");
        let reader = new FileReader();

        reader.onload = function (e) {
            $(`#image-upload-wrap-${index}`).hide();
            $(`#file-upload-image-${index}`).attr("src", e.target.result);
            $(`#file-upload-content-${index}`).show();
            $(`#image-title-${index}`).html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload();
    }
}

function removeUpload(input) {
    const imageIndex = input.target.getAttribute("project-index");

    $(`#project-image-${imageIndex}`).replaceWith($(`#project-image-${imageIndex}`).clone());
    $(`#file-upload-content-${imageIndex}`).hide();
    $(`#image-upload-wrap-${imageIndex}`).show();
    $(`#project-image-${imageIndex}`).val("");
}

$(".image-upload-wrap").bind("dragover", function () {
    $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
    $(".image-upload-wrap").removeClass("image-dropping");
});

$("#create-resume-btn").on("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!$("#resume-name").val() || !$("#name").val() || !$("#contactEmail").val()) {
        return alert("請填寫標示 * 符號之必填項目");
    }
    $("#cover-spin").fadeToggle(200);
    const resumeForm = document.getElementById("resume-form");
    const formData = new FormData(resumeForm);

    const fetchResult = await fetch("/api/1.0/resume", {
        method: "POST",
        body: formData,
    });

    if (fetchResult.status === 200) {
        alert("已成功上傳履歷!");
        window.location.href = "/resumes";
    } else {
        alert("上傳履歷失敗!");
    }
    $("#cover-spin").fadeToggle(100);
});

$("#delete-resume-btn").on("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const resumeTitle = event.target.getAttribute("resume-name");
    let check = confirm(`確認是否刪除 ${resumeTitle} ?`);
    if (!check) {
        return;
    }
    $("#cover-spin").fadeToggle(100);
    const resumeId = window.location.pathname.split("/")[2];
    const fetchResult = await fetch(`/api/1.0/resume/${resumeId}`, {
        method: "DELETE",
    });
    if (fetchResult.status === 200) {
        alert("已成功刪除履歷!");
        window.location.href = "/resumes";
    } else if (fetchResult.status === 403) {
        const result = await fetchResult.json();
        if (result.error === "Reference by another application") {
            return alert("已使用此履歷應徵過職缺，請先取消應徵紀錄再刪除履歷！");
        }
        alert("很抱歉，您沒有權限刪除該履歷!");
    } else {
        alert("刪除履歷失敗!");
    }
    $("#cover-spin").fadeToggle(100);
});

$("#update-resume-btn").on("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!$("#resume-name").val() || !$("#name").val() || !$("#contactEmail").val()) {
        alert("請填寫標示 * 符號之必填項目");
        return;
    }
    $("#cover-spin").fadeToggle(200);
    const resumeForm = document.getElementById("resume-form");
    const formData = new FormData(resumeForm);

    const resumeId = event.target.getAttribute("resume-id");

    const projects = Array.from(document.querySelectorAll(".resume-content.project"));
    const skills = Array.from(document.querySelectorAll(".resume-content.skill"));
    const experiences = Array.from(document.querySelectorAll(".resume-content.experience"));
    const educations = Array.from(document.querySelectorAll(".resume-content.education"));

    const projectId = projects.map((project) => project.getAttribute("project-index"));
    const skillId = skills.map((skill) => skill.getAttribute("skill-index"));
    const experienceId = experiences.map((experience) => experience.getAttribute("experience-index"));
    const educationId = educations.map((education) => education.getAttribute("education-index"));

    const projectImages = Array.from(document.querySelectorAll(".file-upload-image"));
    const projectImageSrc = Object.values(projectImages).map((image) => {
        let srcObj = {};
        let src = image.getAttribute("src");
        let id = image.getAttribute("project-index");
        if (src.slice(0, 5) === "https") {
            srcObj[id] = src;
        } else {
            srcObj[id] = "upload";
        }
        return srcObj;
    });

    formData.set("resumeId", resumeId);
    formData.set("projectImageSrc", JSON.stringify(projectImageSrc));
    formData.set("projectId", JSON.stringify(projectId));
    formData.set("skillId", JSON.stringify(skillId));
    formData.set("experienceId", JSON.stringify(experienceId));
    formData.set("educationId", JSON.stringify(educationId));

    const fetchResult = await fetch(`/api/1.0/resume/${resumeId}`, {
        method: "PATCH",
        body: formData,
    });
    if (fetchResult.status === 200) {
        alert("已成功更新履歷!");
        window.location.href = "/resumes";
    } else {
        alert("更新履歷失敗!");
    }
    $("#cover-spin").fadeToggle(100);
});

function getResumeDetail() {
    return {
        user_name: $("#name").val(),
        gender: $('input[name="gender"]:checked').val(),
        birthday: $("#birthday").val(),
        show_birthday: $("#show-birthday-input").is(":checked") ? 1 : 0,
        phone: $("#phone").val(),
        contact_email: $("#contactEmail").val(),
        personal_url: $("#personal-page-url").val(),
        bio: $('textarea[name="bio"]').val(),
        skill_name: $('input[name="skillName"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        skill_proficiency: $('select[name="skillProficiency"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        skill_intro: $('textarea[name="skillInfo"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        project_title: $('input[name="projectTitle"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        project_link: $('input[name="projectLink"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        project_intro: $('textarea[name="projectInfo"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        project_image: $(".file-upload-image")
            .map(function () {
                return $(this).attr("src");
            })
            .get(),
        experience_title: $('input[name="experienceName"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        experience_org: $('input[name="experienceCompanyName"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        experience_start: $('input[name="experienceTimeStart"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        experience_end: $('input[name="experienceTimeEnd"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        experience_intro: $('textarea[name="experienceInfo"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        education_title: $('input[name="educationName"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        education_department: $('input[name="educationDepartment"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        education_degree: $('input[name="educationDegree"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        education_start: $('input[name="educationTimeStart"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
        education_end: $('input[name="educationTimeEnd"]')
            .map(function () {
                return $(this).val();
            })
            .get(),
    };
}

$(".preview-resume-btn").on("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    let resumeDetail = getResumeDetail();
    previewResume(resumeDetail);
    $(`#resume-modal`)
        .modal({
            blurring: true,
            duration: 200,
        })
        .modal("show");
});

$(".download-resume-btn").on("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    let resumeDetail = getResumeDetail();
    previewResume(resumeDetail);
    $(`#resume-modal`)
        .modal({
            blurring: true,
            duration: 200,
        })
        .modal("show");

    let resume = $("#resume-preview").html();
    let opt = {
        margin: [0, 10, 0, 12],
        filename: "myResume.pdf",
        image: { type: "jpeg", quality: 0.99 },
        html2canvas: { dpi: 300, scale: 2, letterRendering: true, useCORS: true },
        jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(resume).save();
});
