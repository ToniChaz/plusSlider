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
    $.fn.PlusSlider = function(){
        var slider = {};

        slider = jQuery(this)[0];
        slider.ul = $('ul', this);
        slider.li = slider.ul.find('li');
        slider.nu = slider.li.length;
        //slider.inc = slider.ul.find('li').outerWidth();        
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
            sl.attr('class', 'slider' +[i+1]);
            sl.css({
                left: slider.width * i
            });
        }
        slider.go = function(where) {            
            if(where == 'next'){
                $('.sliderNav li', this).removeClass('active');
                slider.pres = (slider.pres < slider.nu-1) ? slider.pres + 1 : 0;
                $('.sliderNav li.sliderLi-' + slider.pres).addClass('active');
                
            } else if(where == 'prev') {
                slider.pres = (slider.pres > 0) ? slider.pres -1 : slider.nu -1;
            } else {
                slider.pres = eval(where);
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

        var autoSlider = setInterval(function(){
            slider.go('next');
        },3000);

        var pagination = '<ul class="sliderNav">';        
            for(i=0; i<slider.nu; i++){
                var activeClass = (i == 0) ? 'active' : '';
                pagination += '<li class="sliderLi-' + (i) + ' ' + activeClass + '"><a href="#" class="slide-' +(i) + '">'+ (i+1) +'</a></li>';
            }
            pagination += '</ul>'; 

        $(slider).append(pagination);

        $('ul.sliderNav li a').click(function() {
            var goTo = $(this).attr('class').substring(6);
            slider.go(goTo);
            $(this).parent().parent().find("li").removeClass('active');
            $(this).parent().addClass('active');
            return false;
        });        
    }
})(jQuery);







