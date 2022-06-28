document.querySelectorAll('.company-card-container').forEach(company => {
    company.addEventListener('click', viewCompanyDetail)

})

async function viewCompanyDetail(event) {
    // event.preventDefault();
    event.stopPropagation();
    const companyId = event.target.getAttribute('company-id')
    window.location.href = `company/${companyId}`
}


// async function getAllCompanies() {

//     const fetchResult = await fetch(`./companiesjs`)
//     const companies = (await fetchResult.json()).data
//     const container = $('.container')
//     const companiesDiv = $('#companies');
//     if (companies.length === 0) {
//         companiesDiv.innerHTML = "查無搜尋的商品!"
//     }
//     else {
//         for (let company of companies) {
//             const companyCard = $(`<a href="./company/${company.id}" class="company-card-container card-shadow"></a>`)
//             const companyCardBanner = $(
//                 `<div class="company-card-banner">
//                     <img src="${company.banner_image}" alt="${company.brand}">
//                 </div>`
//             )
//             const companyCardContent = $(`<div class="company-card-content"></div>`)
//             const companyCardTitle = $(`
//                 <div class="comapny-card-title">
//                     <div class="comapny-card-title-logo avatar">
//                         <img src="${company.logo_image}" alt="${company.brand}">
//                     </div>
//                     <div class="comapny-card-title-name">
//                         <a href="/company/${company.id}">${company.brand}</a>
//                     </div>
//                 </div>
//             `)
//             const companyCardDescription = $(`<div class="company-card-description">${company.short_description}</div>`)
//             const companyCardItem = $('<div class="company-card-item"></div>')
//             const companyCardInfo = $('<div class="company-card-info"></div>')
//             const companyCardFollow = $('<div class="company company-card-follow></div>')
//             const companyCardFooterLocation = $(
//                 `<div class="company-card-footer location" >
//                     <svg width="16px" height="16px" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2)"><path d="m6.5 16.5407715.6311176-.7118691c.71585099-.8191184 1.36011688-1.5983525 1.93279767-2.3377022l.4733382-.6239608c1.97516433-2.6615039 2.96274653-4.77276704 2.96274653-6.33378943 0-3.33218241-2.6862915-6.03344997-6-6.03344997s-6 2.70126756-6 6.03344997c0 1.56102239.98758218 3.67228553 2.96274653 6.33378943l.4733382.6239608c.73630387.9505925 1.5909423 1.9671163 2.56391527 3.0495713z"/><circle cx="6.5" cy="6.5" r="2.5"/></g></svg>
//                     <a href="/companies?location[]=${company.company_location}">${company.company_location}</a>
//                 </div>`
//             )
//             const companyCardFooterCategory = $(
//                 `<div class="company-card-footer category" >
//                 <svg width="16px" height="16px" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"/></svg>
//                     <a href="/companies?category[]=${company.category}">${company.category}</a>
//                 </div>`
//             )
//             const companyCardFooterTags = $(
//                 `<div class="company-card-content-tags" >
//                     <svg width="16px" height="16px" viewBox="0 0 32 32" id="i-tag" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
//                         <circle cx="24" cy="8" r="2" />
//                         <path d="M2 18 L18 2 30 2 30 14 14 30 Z" />
//                     </svg>
//                 </div>`
//             )
//             for (let tag of company.tags) {
//                 const companyCardFooterTag = $(`<a class="card-tag" href="/companies?tag[]=${tag}">${tag}</a>`)
//                 companyCardFooterTags.append(companyCardFooterTag)
//             }

//             companyCardInfo.append(companyCardFooterLocation, companyCardFooterCategory, companyCardFooterTags)
//             companyCardItem.append(companyCardInfo, companyCardFollow)
//             companyCardContent.append(companyCardTitle, companyCardDescription, companyCardInfo)
//             companyCard.append(companyCardBanner, companyCardContent)
//             companiesDiv.append(companyCard)
//         }

//     }
//     container.append(companiesDiv)
// }

// getAllCompanies()



