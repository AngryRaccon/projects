$( document ).ready(function() {
    let headerHeight = $('.header').outerHeight();
    let lastScrollTop = 0;
    $('.menu-item-href').on('click', function(e) {
        let height = $($(this).attr('href')).offset().top - headerHeight;
        let length = $($(this).attr('href')).offset().top - $(document).scrollTop() - headerHeight;
        let scrollTime = Math.abs(+length)/1.73;
        $('html, body').stop().animate({
            scrollTop: height}, scrollTime);
        event.preventDefault();
        history.pushState({}, "", this.href);
    });
});