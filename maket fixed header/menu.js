window.onhashchange = function() {
    if (location.hash === "#team") {
        document.querySelector('#team').style.paddingTop = "50px"
        window.onscroll = function() {
            document.querySelector('#team').style.backgroundColor = "red";
        }; 
    }
}

function jump(el) {
    let id = el.getAttribute("href");
    document.querySelector(id).style.paddingTop = "50px"; 
    //window.scrollTop = function() {
    //    document.querySelector(id).style.backgroundColor = "red";
    //}; 
};

