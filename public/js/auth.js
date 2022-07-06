if ($('#btn-signup')) {
    $('#btn-signup').on('click', signUpFetch);
}
if ($('#btn-signin')) {
    $('#btn-signin').on('click', signInFetch);
}

async function signUpFetch() {
    const url = new URL(window.location);
    let re = /employe[er]/;
    const [role] = url.pathname.match(re);
    let username = $('#signup-name-input').val()
    let email = $('#signup-email-input').val()
    let password = $('#signup-password-input').val()


    if (!username || !email || !password) { alert('Please fullfill the infomation!'); return }
    // if (!checkPassword(password)) { alert('A password needs between 8 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'); return }

    const fetchResult = await fetch(`/api/1.0/signup`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
    })

    const signUpResponse = await fetchResult.json()

    if (fetchResult.status !== 200) { alert(signUpResponse.error); return }
    localStorage.setItem('access_token', "Bearer " + signUpResponse.data.access_token)
    window.location.href = '/jobs'

};

async function signInFetch() {
    const url = new URL(window.location);
    let re = /employe[er]/;
    const [role] = url.pathname.match(re);
    let email = $('#signin-email-input').val()
    let password = $('#signin-password-input').val()
    if (!email || !password) { alert(`${email ? 'Password' : 'Email'} can not be empty!`); return }

    const fetchResult = await fetch(`/api/1.0/signin`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password, role })
    })

    const signInResponse = await fetchResult.json()
    if (fetchResult.status !== 200) { alert(signInResponse.error); return }
    localStorage.setItem('access_token', "Bearer " + signInResponse.data.access_token)
    window.location.href = '/jobs'
};


// function checkPassword(inputtxt) {
//     var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
//     if (!inputtxt.match(passw)) {
//         return false;
//     }
// }
