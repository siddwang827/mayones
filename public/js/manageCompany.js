$('.dropdown')
    .dropdown({
        maxSelections: 4
    })
    ;

document.querySelectorAll('.remove-image').forEach(ele => {
    ele.addEventListener('click', removeUpload)
})

document.querySelectorAll('.image-title').forEach(ele => {
    ele.addEventListener('click', removeUpload)
})

function removeDOM(e, property) {
    e.preventDefault()
    const index = e.target.getAttribute(`${property}-index`)
    $(`#${property}-item-${index}`).remove()
}

function readURL(input) {
    if (input.files && input.files[0]) {
        const imgClass = input.getAttribute('image-class')
        let reader = new FileReader();
        if (imgClass === "others") {
            const index = input.getAttribute('index')
            reader.onload = function (e) {
                $(`#image-upload-wrap-${imgClass}-${index}`).hide();
                $(`#file-upload-image-${imgClass}-${index}`).attr('src', e.target.result);
                $(`#file-upload-content-${imgClass}-${index}`).show();
                $(`#image-title-${imgClass}-${index}`).html(input.files[0].name);
            };

        } else {
            reader.onload = function (e) {
                $(`#image-upload-wrap-${imgClass}`).hide();
                $(`#file-upload-image-${imgClass}`).attr('src', e.target.result);
                $(`#file-upload-content-${imgClass}`).show();
                $(`#image-title-${imgClass}`).html(input.files[0].name);
            };
        }



        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload(input) {

    const imgClass = input.target.getAttribute('image-class')
    if (imgClass === "others") {
        const index = input.target.getAttribute('index')
        $(`#image-${imgClass}-${index}`).replaceWith($(`#image-${imgClass}-${index}`).clone());
        $(`#file-upload-content-${imgClass}-${index}`).hide();
        $(`#image-upload-wrap-${imgClass}-${index}`).show();
        $(`#image-${imgClass}-${index}`).val('')
    } else {
        $(`#image-${imgClass}`).replaceWith($(`#image-${imgClass}`).clone());
        $(`#file-upload-content-${imgClass}`).hide();
        $(`#image-upload-wrap-${imgClass}`).show();
        $(`#image-${imgClass}`).val('')
    }
}

$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});


$('#update-company-btn').on('click', async (event) => {
    event.preventDefault();
    event.stopPropagation()
    console.log($('#company-title').val(), $('#company-short').val(), $('#company-location').val(), $('#company-category').val())
    if (!$('#company-title').val() || !$('#company-short').val() || !$('#company-location').val() || !$('#company-category').val()) {
        return alert('請填寫標示 * 符號之必填項目')
    }
    const companyForm = document.getElementById('company-form')
    const companyTags = $('#company-tags').dropdown('get value')
    const companylocation = $('#company-location').dropdown('get value')
    const companyCategory = $('#company-category').dropdown('get value')
    const companyIntro = editorIntro.getData()
    const companyPhilosophy = editorPhilosophy.getData()
    const companyBenifit = editorBenifit.getData()
    const formData = new FormData(companyForm)

    formData.set('companyTags', JSON.stringify(companyTags))
    formData.set('companyLocation', companylocation)
    formData.set('companyCategory', companyCategory)
    formData.set('companyIntro', companyIntro)
    formData.set('companyPhilosophy', companyPhilosophy)
    formData.set('companyBenifit', companyBenifit)




    const fetchResult = await fetch("/manage/company", {
        method: "POST",
        body: formData,
    })
    if (fetchResult.status === 200) {
        alert("已成功上傳公司!")
        window.location.href = "/companies"

    } else {
        alert("上傳履歷失敗!")
    }
});


