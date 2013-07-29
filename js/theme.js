var readyState = function (callback) {
    var body = document.body;

    if (body && body.readyState == 'loaded') {
        callback();
    }
    else {
        if (window.addEventListener) {
            window.addEventListener('load', callback, false);
        }
        else {
            window.attachEvent('onload', callback);
        }
    }
}

readyState(function () {
    /**
     * Scroll Page
     */
    function scrollPage(page) {
        $('#navigation a[data-nav="scroll"]').removeClass('active');

        $('#navigation a[href="#' + page + '"]').addClass('active');

        scroll = false;

        $('html, body').animate({ scrollTop:$('#' + page).offset().top }, 800, function () {
            scroll = true;
        });
    }

    /**
     * Panel offset
     */
    $('.panel').css({'margin-top':$('#header').height()});

    function introPos() {
        $('#intro').css({'margin-top':( ($('.box:first').height() / 1.1) - $('#header').height() - ($('#intro').height() / 2) )});
    }

    introPos();
    $('#intro').fadeIn();


    /**
     * Window scroll
     */
    $(window).scroll(function () {
        var self = this;

        if ($(this).scrollTop() > 100) {
            $('#back-top').fadeIn();
        }
        else {
            $('#back-top').fadeOut();
        }
    });

    /**
     * Window resize
     */
    $(window).resize(function () {
        introPos();
    });

    /**
     * Scroll to top links
     */
    $('#navigation a[data-nav="scroll"]:last').click(function (event) {
        $('html, body').animate({ scrollTop:$('#contact').offset().top }, 800);
        return false;
    });

    $('#back-top').click(function (event) {
//        $('#navigation a[data-nav="scroll"]').removeClass('active');
//        var firstItem = $('#navigation a[data-nav="scroll"]:first');
//        firstItem.addClass('active');

        $('html, body').animate({ scrollTop:0 }, 800);
        return false;
    });


    /**
     * Vegas background image slider
     */
    if (vegas_images.length) {
        $.vegas('slideshow', {
            delay:10000,
            backgrounds:vegas_images
        })('overlay');
    }

    /**
     * Flexslider
     */
    $('.flexslider').flexslider();
});
