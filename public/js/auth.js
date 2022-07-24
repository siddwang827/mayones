if ($("#btn-signup")) {
    $("#btn-signup").on("click", signUpFetch);
}
if ($("#btn-signin")) {
    $("#btn-signin").on("click", signInFetch);
}

async function signUpFetch() {
    const url = new URL(window.location);
    let re = /employe[er]/;
    let checkWhiteSpace = /\s/;
    const [role] = url.pathname.match(re);
    let username = $("#signup-name-input").val();
    let email = $("#signup-email-input").val();
    let password = $("#signup-password-input").val();
    let result = checkWhiteSpace.test(username);

    if (result) {
        alert("使用者名稱不可含有空白！");
        return;
    }

    if (!username || !email || !password) {
        alert("請填寫完整資料！");
        return;
    }

    if (!checkPassword(password)) {
        alert("密碼需介於8-20個字元，且必須包含大小寫英文字母與數字！");
        return;
    }

    if (username.length > 20) {
        alert("使用者名稱不可超過20個字元！");
    }
    const fetchResult = await fetch(`/api/1.0/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
    });

    const signUpResponse = await fetchResult.json();

    if (fetchResult.status !== 200) {
        switch (signUpResponse.error) {
            case "Lack of necessary information!":
                alert("請確實填寫所有資訊！");
                break;
            case "Invalid email format!":
                alert("請輸入正確的電子郵箱格式！");
                break;
            case "Email has already signed up!":
                alert("此電子郵箱已經註冊！");
                break;
            case "Username too long!":
                alert("使用者名稱不可超過20個字元！");
                break;
            case "Database Query Error!":
                alert("系統錯誤，請聯繫客服人員！");
                break;
        }
        return;
    }
    // localStorage.setItem("access_token", "Bearer " + signUpResponse.data.access_token);
    window.location.href = "/jobs";
}

async function signInFetch() {
    const url = new URL(window.location);
    let re = /employe[er]/;
    const [role] = url.pathname.match(re);
    let email = $("#signin-email-input").val();
    let password = $("#signin-password-input").val();
    if (!email || !password) {
        alert(`請輸入${email ? "密碼" : "電子郵箱"}！`);
        return;
    }

    const fetchResult = await fetch(`/api/1.0/signin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, role }),
    });

    const signInResponse = await fetchResult.json();
    if (fetchResult.status !== 200) {
        if (fetchResult.status !== 200) {
            switch (signInResponse.error) {
                case "Lack of necessary information!":
                    alert("請確實填寫所有資訊！");
                    break;
                case "Invalid email format!":
                    alert("請輸入正確的電子郵箱格式！");
                    break;
                case "Email is not exist!":
                    alert("此電子郵箱尚未註冊");
                    break;
                case "Wrong password!":
                    alert("密碼錯誤！");
                    break;
                case "Database Query Error!":
                    alert("系統錯誤，請聯繫客服人員！");
                    break;
            }
            return;
        }
    }
    // localStorage.setItem("access_token", "Bearer " + signInResponse.data.access_token);
    window.location.href = "/jobs";
}

function checkPassword(inputtxt) {
    let password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (inputtxt.match(password)) {
        return true;
    } else {
        return false;
    }
}
