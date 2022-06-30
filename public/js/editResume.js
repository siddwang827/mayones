// CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
//     // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
//     toolbar: {
//         items: [
//             'undo', 'redo', '|',
//             'heading', '|',
//             'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
//             'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', 'removeFormat', '|',
//             'findAndReplace', 'selectAll', '|',
//             '-',
//             'bulletedList', 'numberedList', 'todoList', '|',
//             'outdent', 'indent', '|',
//             'alignment', '|',
//             'link', 'insertImage', 'blockQuote', 'insertTable', 'codeBlock', '|',
//             'specialCharacters', 'horizontalLine', '|',
//             'exportPDF', 'sourceEditing', '|',


//         ],
//         shouldNotGroupWhenFull: true
//     },
//     // Changing the language of the interface requires loading the language file using the <script> tag.
//     // language: 'es',
//     list: {
//         properties: {
//             styles: true,
//             startIndex: true,
//             reversed: true
//         }
//     },
//     // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
//     heading: {
//         options: [
//             { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
//             { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
//             { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
//             { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
//         ]
//     },
//     // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
//     placeholder: 'Edit Your Own Resume!',
//     // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
//     fontFamily: {
//         options: [
//             'default',
//             'Microsoft JhengHei',
//             'DFKai-sb',
//             'PMingLiU',
//             'Arial, Helvetica, sans-serif',
//             'Courier New, Courier, monospace',
//             'Georgia, serif',
//             'Lucida Sans Unicode, Lucida Grande, sans-serif',
//             'Tahoma, Geneva, sans-serif',
//             'Times New Roman, Times, serif',
//             'Trebuchet MS, Helvetica, sans-serif',
//             'Verdana, Geneva, sans-serif',

//         ],
//         supportAllValues: true
//     },
//     // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
//     fontSize: {
//         options: [10, 12, 14, 'default', 18, 20, 24, 28],
//         supportAllValues: true
//     },
//     // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
//     // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
//     htmlSupport: {
//         allow: [
//             {
//                 name: /.*/,
//                 attributes: true,
//                 classes: true,
//                 styles: true
//             }
//         ]
//     },

//     // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
//     link: {
//         decorators: {
//             addTargetToExternalLinks: true,
//             defaultProtocol: 'https://',
//             toggleDownloadable: {
//                 mode: 'manual',
//                 label: 'Downloadable',
//                 attributes: {
//                     download: 'file'
//                 }
//             }
//         }
//     },
//     // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
//     mention: {
//         feeds: [
//             {
//                 marker: '@',
//                 feed: [
//                     '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
//                     '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
//                     '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
//                     '@sugar', '@sweet', '@topping', '@wafer'
//                 ],
//                 minimumCharacters: 1
//             }
//         ]
//     },
//     // The "super-build" contains more premium features that require additional configuration, disable them below.
//     // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
//     removePlugins: [
//         // These two are commercial, but you can try them out without registering to a trial.
//         // 'ExportPdf',
//         // 'ExportWord',
//         'CKBox',
//         'CKFinder',
//         'EasyImage',
//         // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
//         // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
//         // Storing images as Base64 is usually a very bad idea.
//         // Replace it on production website with other solutions:
//         // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
//         // 'Base64UploadAdapter',
//         'RealTimeCollaborativeComments',
//         'RealTimeCollaborativeTrackChanges',
//         'RealTimeCollaborativeRevisionHistory',
//         'PresenceList',
//         'Comments',
//         'TrackChanges',
//         'TrackChangesData',
//         'RevisionHistory',
//         'Pagination',
//         'WProofreader',
//         // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
//         // from a local file system (file://) - load this site via HTTP server if you enable MathType
//         'MathType'
//     ]
// });


const column = document.querySelector('.container');

new Sortable(column, {

    sort: true,
    animation: 150,
    ghostClass: 'on-dragging',
    draggable: ".draggable",
    filter: ".fixed",
    forceFallback: true,
});

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

$('.ui.confirm-btn').on('click', () => {
    $('.modal').modal('hide')
})

$('#add-skill-btn').on('click', () => {
    const skillsDOM = $('.resume-content.skill')
    const index = skillsDOM.length ? parseInt(skillsDOM[skillsDOM.length - 1].getAttribute('skill-index')) + 1 : 0
    const property = 'skill'
    $('#resume-skill-list').append($(`
        <div id="skill-item-${index}" class="resume-content skill" skill-index=${index}>
            <div class="content-container">
                <div class="form-group skill">
                    <label for="skill-name">技能名稱</label>
                    <div class="input-wrap">
                        <input name="skillName" class="form-control" id="skill-name-${index}" value="">
                    </div>
                </div>
                <div class="form-group skill">
                    <label for="skill-proficiency">熟練程度</label>
                    <div class="input-wrap">
                        <select class="ui dropdown select" name="proficiency" id="skill-proficiency-${index}">
                            <option value="beginner">初階</option>
                            <option value="intermediate">熟練</option>
                            <option value="expert">精通</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="skill-info">技能描述</label>
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

$('#add-project-btn').on('click', () => {
    const projectsDOM = $('.resume-content.project')
    const index = skillsDOM.length ? parseInt(skillsDOM[skillsDOM.length - 1].getAttribute('skill-index')) + 1 : 0
    const property = 'skill'
    console.log($('#resume-project-list'))

    $('#resume-project-list').append($(`
    <div class="resume-content-project">
        <div class="content-container-col">
            <div class="form-group">
                <label for="project-title">專案名稱</label>
                <div class="input-wrap">
                    <input name="projectTile" class="form-control" id="project-title"></input>
                </div>
            </div>
            <div class="form-group">
                <label for="project-link">專案連結</label>
                <div class="input-wrap">
                    <input name="projectLink" class="form-control" id="project-link"></input>
                </div>
            </div>
            <div class="form-group">
                <label for="project-info">專案描述</label>
                <div class="input-wrap">
                    <textarea name="projectInfo" class="form-control" id="project-info" rows=1 value=""></textarea>
                </div>
            </div>
        </div>
        <div class="image-upload-wrap">
            <input class="file-upload-input" type='file' onchange="readURL(this);" accept="image/*" />
            <div class="drag-text">
                <p>Drag and drop a file or select add Image</p>
            </div>
        </div>
        <div class="file-upload-content">
            <img class="file-upload-image" src="#" alt="your image" />
            <div class="image-title-wrap">
                <button type="button" onclick="removeUpload()" class="remove-image">Remove <span class="image-title">Uploaded
                        Image</span></button>
            </div>
        </div>
    </div>`))
})




function removeDOM(e, property) {
    const index = e.target.getAttribute(`${property}-index`)
    $(`#${property}-item-${index}`).remove()

}


function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

