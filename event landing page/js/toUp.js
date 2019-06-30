$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() != 0) { 
            $('#goUp').fadeIn(); 
        } else {
            $('#goUp').fadeOut();
        }
    });
    $('#goUp').click(function() {
        $('body,html').animate({scrollTop:0},800);
    });
});

