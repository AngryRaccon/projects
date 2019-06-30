function player() {
    let video = document.querySelector("#video");
    video.play();
    video.setAttribute("controls", "controls");
    document.querySelector(".video-description").style.display = "none";
    
}
function InitVideo() {
    let video = document.querySelector("#video");
    video.onpause = function() {
        document.querySelector(".video-description").style.display = "block";
    }
    video.onplay = function() {
        document.querySelector(".video-description").style.display = "none";
    }
}
