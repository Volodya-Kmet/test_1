$(function () {
    //======================================================== About Us
    var skill = {
        chacker: 0,

        getProcent: function (x) {//get percent in HTML from cild element
            var elem = $(x).children()[0].lastChild;
            var percent = parseInt($(elem).html());
            $(elem).html('0%').css('display', 'block');
            return percent;
        },
        getBoard: function (x) {//get element for show percent
            return $(x).children()[0].lastChild;
        },
        getDiagram: function (x) {//get element progressing diagram
            return $(x).children()[1].lastChild;
        },
        animateDiagram: function (x) {
            var procent = skill.getProcent(x);
            var diagdam = skill.getDiagram(x);
            var board = skill.getBoard(x);
            var step = procent / 100;//.....progress step in %
            var index = 0;

            var time = setInterval(function () {
                $(diagdam).css('width', index + '%');//....add step to width diagram
                $(board).html(Math.floor(index) + '%');//...show number of progress
                if (index >= procent) {
                    clearInterval(time);//....stop function when diagram width == reqired %
                }
                index = index + step;
            }, 10)
        }
    }
    //================================scroll
    function navScroll(x) {
        $(x).on('click', function (event) {
            var target = $(x).attr('href');//.......... get link
            var el = document.querySelector(target).getBoundingClientRect().top;//....get distance to element
            var top = el + pageYOffset; ///////get position in document and animate
            $('html, body').animate({
                scrollTop: top
            }, 1000)
            event.preventDefault();
        })
    }

    $('a.nav_item').each(function (i, el) {
        navScroll(el);
    });

    function lightNavbar() {
        var window_top = window.pageYOffset;//....position of window
        $(".section").each(function (i, elem) {
            var section_top = $(this).offset().top;//......get position of every section
            if (window_top >= section_top) {//....if on section
                var section_1 = $(this).attr('id');
                $('.active').removeClass('active');
                $('[href="#' + section_1 + '"]').addClass('active');//get elem where href == id, add class for required element

                if (section_1 == 'aboutUs' && skill.chacker == 0) {//when on About Us animate graphics
                    $('.skill_block').each(function (i, elem) {
                        skill.animateDiagram(elem);
                        skill.chacker = 1;
                    });
                }
            }
            else {
                $('[href="#' + section_1 + '"]').removeClass('active');
            }
        });
    }

    $(window).scroll(lightNavbar);
});

//===================================================navBar
//change icon(arrow) when hover to menu
$(function () {
    function changeIcon(x) {
        $(x).each(function (i, elem) { //........for every element
            $(elem).hover(function () { //........on hover
                $(elem).children('i') //..........change class name
                    .toggleClass('icon-right-open icon-angle-double-right');
            }, function () {
                $(elem).children('i')
                    .toggleClass('icon-right-open icon-angle-double-right');
            })
        })
    }

    changeIcon('.menu_item');
    changeIcon('.submenu_list');

    $('.icon-menu').on('click', function () {
        if ($('.nav_menu').height() == 0) {
            $('.nav_menu')
                .css({
                    'display': 'block',
                    'height': '100vw'
                })
        } else {
            $('.nav_menu')
                .css({
                    'display': '',
                    'height': ''
                })
        }
    })
});
//=====================================================header
//...slider
$(function () {
    var arrSlide = $('.slide_block');
    var index = 0;
    var timerSlider = 5000;

    var slider;
    slider = {
        animateDot: function () { //..........change style for dot[index]
            $('.dot').each(function () {
                $(this).css('backgroundColor', '');
            });
            $('.dot').eq(index).css('backgroundColor', '#fff');
        },

        showSlide: function () { //........change position of '.sliders_container' according var index
            if (index == arrSlide.length) {
                index = 0;
            }
            if (index < 0) {
                index = arrSlide.length - 1;
            }
            $('.sliders_container').animate({
                left: '-' + (index * 100) + 'vw'
            });
            slider.animateDot();
        },

        autoPlay: function (min, max) { //.........set max min bound of duration
            setTimeout(function () {
                timerSlider = Math.round(Math.random() * (max - min) + min); //.....create random duration of slide
                index += 1;
                slider.showSlide(index); //.......change slide
                slider.autoPlay(min, max); //.......recursion
            }, timerSlider);
        },

        chacker: 0
    };

    slider.autoPlay(3000, 10000);

    //....give action on click
    $('.arrow_left').on('click', function () {
        index -= 1;
        slider.showSlide(index);
    });
    $('.arrow_right').on('click', function () {
        index += 1;
        slider.showSlide(index);
    });
    $('.dot').each(function (i, el) {
        $(el).on('click', function () {
            index = i;
            slider.showSlide();
        })
    })
});

//========================================================= contacts
$(function () {
    //.....effects for arrow in input email
    var check = 0;
    $(".form_mail").on('click', function () {
        check++;
        if (check == 2) { //.......changing style when autocomplete open;
            $(".icon-down-dir").css({
                'transform': 'rotate(0deg)',
                'color': '#fff'
            });
            check = 0;
        }
    });
    $('.icon-down-dir').on("click", function () { //.....focus on input when clicked arrow
        $('.form_mail').trigger("focus");
        check = 1;
    });
    $('body').on('click', function (e) { //.....returne previus position arrow on blur
        var event = e.target;
        if (event != $('.form_mail')[0]) {
            $(".icon-down-dir").css({
                'transform': '',
                'color': ''
            });
            check = 0;
        }
    });
    //.....checkbox
    $('.div_checkbox').on('click', function () {
        $('.checkbox_checker').fadeToggle();
        if ($('#check').attr('checked') != 'checked') {
            $('#check').attr('checked', 'true');
        } else if ($('#check').attr('checked') == 'checked') {
            $('#check').attr('checked', false);
        }
    });
    //....validation

    $('.form_button').on('click', function () {
        if ($('.form_checkbox').attr('checked') != 'checked') {
            $('.error_checkbox').css('display', 'block');
            return false;
        } else {
            $('.error_checkbox').css('display', '');
        }
    });
});
