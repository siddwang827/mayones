$(".follow").on("click", follow);
$(".followed").on("click", unfollow);
$(".button.application").on("click", application);

async function follow(event) {
    event.stopPropagation();
    event.preventDefault();
    const cookie = document.cookie;
    if (!cookie) {
        alert("你目前尚未登入，請先登入！");
        window.location.href = "/employee/signin";
    }
    const jobId = event.target.getAttribute("job-id");
    const fetchResult = await fetch(`/api/1.0/follow`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            type: "job",
            id: jobId,
        }),
    });
    if (fetchResult.status === 403) {
        alert("您目前的身分無法收藏職缺！");
        return;
    }
    const followId = await fetchResult.json();
    $(".follow").replaceWith(
        $(`<div class="huge ui red button followed" follow-id=${followId.id}>
            已收藏
        </div>`)
    );
    $(".followed").on("click", unfollow);
}

async function unfollow(event) {
    event.preventDefault();
    event.stopPropagation();
    const followId = event.target.getAttribute("follow-id");
    await fetch(`/api/1.0/follow/job/${followId}`, {
        method: "DELETE",
    });
    const jobId = $(".application").attr("job-id");

    $(".followed").replaceWith(
        $(`<div class="huge ui inverted red button follow" job-id=${jobId}>
            <i class="heart outline icon"></i>
            加入收藏
        </div>`)
    );
    $(".follow").on("click", follow);
}

async function application(event) {
    event.stopPropagation();
    event.preventDefault();
    const cookie = document.cookie;
    if (!cookie) {
        alert("你目前尚未登入，請先登入！");
        return;
    }
    const jobId = event.target.getAttribute("job-id");
    const fetchResult = await fetch(`/application/${jobId}`, {});
    if (fetchResult.status === 200) {
        window.location.href = `/application/${jobId}`;
    } else if (fetchResult.status === 403) {
        alert("您目前的身分無法應徵職缺！");
    } else {
        alert("你目前尚未登入，請先登入！");
    }
}
