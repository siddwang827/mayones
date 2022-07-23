$("#profile-btn").on("click", (event) => {
    $("#profile-dropdown").fadeToggle(200);
});

$("#logout").on("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const fetchResult = await fetch("/api/1.0/logout");

    if (fetchResult.status !== 200) {
        alert("登入狀態驗證失敗，請重新登入！");
        window.location.href = "/employee/signin";
    } else {
        alert("成功登出！");
        window.location.href = "/jobs";
    }
});
