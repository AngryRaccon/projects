function timer() {
    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth();
    let eventDate = new Date(year, ++month);
    let delta = eventDate - currentTime;
    let days = Math.trunc(delta / 86400000);
    let hours = Math.trunc((delta - days * 86400000) / 3600000);
    let minutes = Math.trunc((delta / (1000 * 60)) % 60);
    let seconds = Math.trunc((delta / 1000) % 60);
    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    document.getElementById('timer-span').innerHTML = days + ' : ' + hours + ' : ' + minutes + ' : ' + seconds;
}

function timerInit() {
    setInterval(timer, 1000);
}