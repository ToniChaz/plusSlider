// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
// Slider plugin
(function($){
    $.fn.PlusSlider = function(auto){
        var slider = {};

        slider = jQuery(this)[0];
        slider.ul = $('ul', this);
        slider.li = slider.ul.find('li');
        slider.nu = slider.li.length;
        slider.inc = slider.ul.find('li').outerWidth();
        console.log(slider.inc);
        slider.pres = 0;
        slider.height = 0;
        slider.width = 0;

        for(i=0; i<slider.nu; i++){
            var w = $(slider.li[i]).width();
            var h = $(slider.li[i]).height();
            slider.height = (h > slider.height) ? h : slider.height;
            slider.width = (w > slider.width) ? w : slider.width;
        }
        slider.ul.css({
            width: slider.width,
            height: slider.height
        });
        for(i=0; i<slider.nu; i++){
            var sl = $(slider.li[i]);
            sl.attr('class', 'slider' +i);
            sl.css({
                left: slider.width * i
            });
        }
        slider.go = function(where) {
            if(where == 'next'){
                slider.pres = (slider.pres < slider.nu-1) ? slider.pres*1 + 1 : 0;
            } else if(where == 'prev') {
                slider.pres = (slider.pres > 0) ? slider.pres -1 : slider.nu -1;
            } else {
                slider.pres = where;
            }
            for(i=0; i<slider.nu; i++){
                var sl = $(slider.li[i]);
                sl.animate({
                    left: slider.width * (i - slider.pres)
                },100);
            }
        }
        $(".next").click(function () {
          slider.go('next');
          return false; 
        });
        $(".prev").click(function () {
          slider.go('prev');
          return false; 
        });
        var auto;
        if(auto){
            var autoSlider = setInterval(function () {
                slider.go('next');
            },10*1000);
        }
    }
})(jQuery);