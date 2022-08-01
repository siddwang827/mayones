$(".ui.dropdown").dropdown();

$(".item.resume").on("click", async (event) => {
    const resumeId = event.target.getAttribute("resume-id");
    const fetchResult = await fetch(`/api/1.0/resume/${resumeId}`);
    const resume = await fetchResult.json();
    localStorage.setItem("resumeId", resumeId);
    previewResume(resume);
});

$("#apply-btn").on("click", async (event) => {
    if ($(".selected.active").length === 0 || $("#resume-preview").length === 0) {
        alert("請選擇欲投遞此職缺之履歷！");
        return;
    }
    const checkApply = confirm("確認是否投遞履歷？");
    if (!checkApply) {
        return;
    }
    const jobId = window.location.pathname.split("/")[2];
    const resumeId = localStorage.getItem("resumeId");

    const fetchResult = await fetch("/api/1.0/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jobId,
            resumeId,
        }),
    });

    await fetchResult.json();
    if (fetchResult.status === 200) {
        alert("履歷投遞成功！");
        window.location.href = "/applications";
    } else if (fetchResult.status === 403) {
        alert("您已應徵過該職缺，請查看應徵紀錄！");
        window.location.href = "/applications";
    } else {
        alert("履歷投遞失敗，請稍後重試！");
    }
});
