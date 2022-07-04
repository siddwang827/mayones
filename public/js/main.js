$('#profile-btn').on('click', (event) => {
    $('#profile-dropdown').fadeToggle(200)
    // if (!$('#profile-dropdown').hasClass('active')) {
    //     $('#profile-dropdown').addClass('active')
    // } else {
    //     $('#profile-dropdown').removeClass('active')
    // }

})

// $(document).on('click', function (e) {
//     if ($(e.target).closest("#profile-dropdown").length === 0) {
//         $("#profile-dropdown").hide();
//     }
// });