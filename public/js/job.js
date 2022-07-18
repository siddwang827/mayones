const api = 'api/1.0';

async function createTagsDOMFromSearch() {
    function createDOM(queryType, tag, n) {
        tag = decodeURIComponent(tag)
        // const timeStamp = Date.now()
        if (!$('.tag-list').length) {
            $('<div class="tag-list"></div>').insertBefore($('#jobs'))
        }
        $('.tag-list').append(`
            <div class= "tag-label ${queryType}" id = "${queryType}-${n}">
                <p>${tag}</p>
                <i class="close icon" tag-label="${queryType}-${n}" data-type="${queryType}"></i>
            </div>
            `)
        $(`#${queryType}-${n}`).on('click', removeTag)
    }
    const search = window.location.search.slice(1)
    if (!search) { return }
    let queryItems = search.split('&')
    if (queryItems.length === 1) {
        let [queryType, tag] = queryItems[0].split('[]=')
        createDOM(queryType, tag)
    }
    else {
        let n = 0
        queryItems.forEach((queryItem) => {
            let [queryType, tag] = queryItem.split('[]=')
            createDOM(queryType, tag, n)
            n += 1
        })
    }
}


createTagsDOMFromSearch();
$('.ui.dropdown').dropdown();

$('.query').on('click', (e) => {
    const tag = e.target.innerText
    const tagUrlEncode = tag.replaceAll('+', '%2B')
    const queryType = e.target.getAttribute('query')
    const newParam = `${queryType}[]=${tagUrlEncode}`
    const params = window.location.search
    const nowURL = window.location
    const timeStamp = e.timeStamp
    console.log(newParam)
    if (!params) {
        window.location = `${nowURL}?${newParam}`
    } else {
        window.location = `${nowURL}&${newParam}`
    }
    if (!$('.tag-list').length) {
        $('<div class="tag-list"></div>').insertBefore($('#jobs'))
    }

    $('.tag-list').append(`
        <div class= "tag-label ${queryType}" id = "${queryType}-${timeStamp}">
            <p>${tag}</p>
            <i class="close icon" tag-label="${queryType}-${timeStamp}" data-type="${queryType}"></i>
        </div>
        `)

    $(`#${queryType}-${timeStamp}`).on('click', removeTag)

})

async function removeTag(event) {
    const label = event.target.parentElement
    console.log(label)
    const queryType = label.getAttribute('id').split('-')[0]
    const query = label.innerText
    label.remove()
    const search = window.location.search.slice(1).replaceAll('/', '%2F')
    const thisTag = `${queryType}[]=${encodeURIComponent(query)}`
    console.log(thisTag)
    const searchArr = search.split('&').filter(param => param !== thisTag)
    if (searchArr.length === 0) {
        window.location = "/jobs"
    } else {
        window.location = `?${searchArr.join('&')}`
    }
}



$('#search-input').on('keypress', event => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        let keyword = event.target.value;
        if (window.location.search[0] === "?") {
            window.location.href += `&tag[]=${keyword}`
        } else {
            window.location.href = `?tag[]=${keyword}`
        }

    }
})

$('#search-btn').on('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const inputID = event.target.getAttribute('input-id')
    const keyword = $(`#${inputID}`).val()
    window.location.href = `?tag[]=${keyword}`
})

