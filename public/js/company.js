createTagsDOMFromSearch();
$(".ui.dropdown").dropdown();
$(".company-card-container").on("click", viewCompanyDetail);
$("#search-input").on("keypress", keypressSearch);
$("#search-btn").on("click", clickSearch);

$(".query").on("click", (e) => {
    const tag = e.target.innerText;
    const queryType = e.target.getAttribute("query");
    const newParam = `${queryType}[]=${tag}`;
    const params = window.location.search;
    const timeStamp = e.timeStamp;
    if (!params) {
        window.location = `${window.location}?${newParam}`;
    } else {
        window.location = `${window.location}&${newParam}`;
    }
    if (!$(".tag-list").length) {
        $('<div class="tag-list"></div>').insertAfter($("#search-bar"));
    }

    $(".tag-list").append(`
    <div class= "tag-label ${queryType}" id = "${queryType}-${timeStamp}">
        <p>${tag}</p>
        <i class="close icon" tag-label="${queryType}-${timeStamp}" data-type="${queryType}"></i>
    </div>
    `);

    $(`#${queryType}-${timeStamp}`).on("click", removeTag);
});

async function viewCompanyDetail(event) {
    event.stopPropagation();
    const companyId = event.target.getAttribute("company-id");
    if (companyId) {
        window.location.href = `company/${companyId}`;
    }
    return;
}

function keypressSearch(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        let keyword = event.target.value;
        if (window.location.search[0] === "?") {
            window.location.href += `&tag[]=${keyword}`;
        } else {
            window.location.href = `?tag[]=${keyword}`;
        }
    }
}

function clickSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    const inputID = event.target.getAttribute("input-id");
    const keyword = $(`#${inputID}`).val();
    if (window.location.search[0] === "?") {
        window.location.href += `&tag[]=${keyword}`;
    } else {
        window.location.href = `?tag[]=${keyword}`;
    }
}
async function createTagsDOMFromSearch() {
    function createDOM(queryType, tag, n) {
        tag = decodeURIComponent(tag);
        if (!$(".tag-list").length) {
            $('<div class="tag-list"></div>').insertAfter($("#search-bar"));
        }
        $(".tag-list").append(`
            <div class= "tag-label ${queryType}" id = "${queryType}-${n}">
                <p>${tag}</p>
                <i class="close icon" tag-label="${queryType}-${n}" data-type="${queryType}"></i>
            </div>
            `);
        $(`#${queryType}-${n}`).on("click", removeTag);
    }
    const search = window.location.search.slice(1);
    if (!search) {
        return;
    }
    let queryItems = search.split("&");
    if (queryItems.length === 1) {
        let [queryType, tag] = queryItems[0].split("[]=");
        createDOM(queryType, tag);
    } else {
        let n = 0;
        queryItems.forEach((queryItem) => {
            let [queryType, tag] = queryItem.split("[]=");
            createDOM(queryType, tag, n);
            n += 1;
        });
    }
}

async function removeTag(event) {
    const label = event.target.getAttribute("tag-label");
    const queryType = event.target.getAttribute("data-type");
    const query = document.getElementById(`${label}`).innerText;
    $(`#${label}`).remove();
    const search = window.location.search.slice(1).replaceAll("/", "%2F");
    const thisTag = `${queryType}[]=${encodeURIComponent(query)}`;
    const searchArr = search.split("&").filter((param) => param !== thisTag);
    if (searchArr.length === 0) {
        window.location = "/companies";
    } else {
        window.location = `?${searchArr.join("&")}`;
    }
}
