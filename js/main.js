(function ($) {
    "use strict";

    // // Sticky Navbar
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 40) {
    //         $('.navbar').addClass('sticky-top');
    //     } else {
    //         $('.navbar').removeClass('sticky-top');
    //     }
    // });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 45,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        const navbarCollapse = document.getElementById("navbarCollapse");
    
        // Listen for collapse show/hide events from Bootstrap
        navbarCollapse.addEventListener('show.bs.collapse', function () {
            // Remove inline styles when the menu is expanded
            navbarCollapse.removeAttribute('style');
        });
    
        // When the collapse finishes collapsing
        navbarCollapse.addEventListener('hidden.bs.collapse', function () {
            // Restore original style after animation ends
            navbarCollapse.setAttribute('style', 'position: relative; left: -4.5em;');
        });
    });

    $(document).ready(function () {
        const widget = document.getElementById('snapwidget');
        const widgetContainer = document.getElementById('snapwidget-container');
        const backup = document.getElementById('backup-embedded');
        
        // Timeout if widget doesn't load in 3 seconds
        const widgetTimeout = setTimeout(() => {
            widgetContainer.style.display = 'none';
            widget.style.display = 'none';
            backup.style.display = 'block';
        }, 3000);
        
        // If widget loads, cancel fallback
        widget.onload = () => clearTimeout(widgetTimeout);
    }); 

})(jQuery);

