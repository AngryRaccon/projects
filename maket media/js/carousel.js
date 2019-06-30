var currentImg = 1;
function setBGimg(img_idx) {
    document.querySelector(".header").style.backgroundImage = "url(img/header-bg-" + img_idx + "-img.jpg)";
    resetTimer();
    return false;
};
function previousImg() {
    currentImg--;
    if (currentImg == 0) {
        currentImg = 5;
    };
    document.querySelector(".header").style.backgroundImage = "url(img/header-bg-" + currentImg + "-img.jpg)";
    resetTimer();
    return false;
};

function nextImageWithReset() {
    nextImg();
    resetTimer();
    return false;
}

function nextImg() {
    currentImg++;
    if(currentImg == 6) {
        currentImg = 1;
    };
    document.querySelector(".header").style.backgroundImage = "url(img/header-bg-" + currentImg + "-img.jpg)";
};

var timerID;

function carouselTimer() {
    timerID = setInterval(nextImg, 5000);
}

function resetTimer() {
    clearInterval(timerID);
    timerID = setInterval(nextImg, 5000);
}