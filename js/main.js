(function ($) {
    "use strict";

    /* ==========================================================================
   // Preloader
  ========================================================================== */
    $(window).on('load', function () { 
      $('#status').fadeOut(); 
      $('#preloader').delay(350).fadeOut('slow'); 
      $('body').delay(350).css({
        'overflow': 'visible',
      });
    });
  
/* ==========================================================================
   //mobile-menu
  ========================================================================== */
    jQuery('#mobile-menu').meanmenu({
    meanMenuContainer: '.mobile-menu',
    meanScreenWidth: "991",
  });
/* ==========================================================================
   //background image call
  ========================================================================== */
  $("[data-background]").each(function(){
    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
  })
/* ==========================================================================
   //header-sticky
  ========================================================================== */
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 150) {
      $(".header-sticky").removeClass("sticky");
    } else {
      $(".header-sticky").addClass("sticky");
    }
  });

   //home2-style scroll sticky
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 150) {
        $(".header2-sticky").removeClass("sticky2");
      } else {
        $(".header2-sticky").addClass("sticky2");
      }
    });
    //home3-style scroll sticky
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 150) {
        $(".header3-sticky").removeClass("sticky3");
      } else {
        $(".header3-sticky").addClass("sticky3");
      }
    });
/* ==========================================================================
   //nav
  ========================================================================== */
    var topMenu = jQuery("#nav"),
    offset = 40,
    topMenuHeight = topMenu.outerHeight() + offset,
    // All list items
    menuItems = topMenu.find('a[href*="#"]'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var href = jQuery(this).attr("href"),
        id = href.substring(href.indexOf('#')),
        item = jQuery(id);
      //console.log(item)
      if (item.length) {
        return item;
      }
    });

  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    var href = jQuery(this).attr("href"),
      id = href.substring(href.indexOf('#'));
    offsetTop = href === "#" ? 0 : jQuery(href).offset().top - topMenuHeight + 1;
    jQuery('html, body').stop().animate({
      scrollTop: offsetTop
    }, 300);
    e.preventDefault();
    $(".navbar-collapse").collapse("hide");
  });

  // Bind to scroll
  jQuery(window).scroll(function () {
    // Get container scroll position
    var fromTop = jQuery(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if (jQuery(this).offset().top < fromTop)
        return this;
    });

    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    menuItems.parent().removeClass("active");
    if (id) {
      menuItems.parent().end().filter("[href*='#" + id + "']").parent().addClass("active");
    }
  });  
/* ==========================================================================
   //Scroll back to top
  ========================================================================== */
  var progressPath = document.querySelector('.progress-wrap path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  }
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  var duration = 550;
  jQuery(window).on('scroll', function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.progress-wrap').addClass('active-progress');
    } else {
      jQuery('.progress-wrap').removeClass('active-progress');
    }
  });
  jQuery('.progress-wrap').on('click', function (event) {
    event.preventDefault();
    jQuery('html, body').animate({
      scrollTop: 0
    }, duration);
    return false;
  })

  /* ==========================================================================
     //appScreen-active
  ========================================================================== */
    $('.appScreen-active').slick({
      centerMode: true,
      centerPadding: '10px',
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i></button>',
      slidesToShow: 5,
      slidesToScroll: 5,
      dots: true,
      responsive: [{
          breakpoint: 1056,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '10px',
            slidesToShow: 5,
            slidesToScroll: 5,
            dots: true,
          }
        },
        {
          breakpoint: 991,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '8px',
            slidesToShow: 3,
            slidesToScroll: 5,
            dots: true,
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '10px',
            slidesToShow: 1,
            slidesToScroll: 5,
            dots: true,
          }
        }
      ]
    });

  /* ==========================================================================
     //pricng swicher button
  ========================================================================== */
    var toggleSwitch = $('#switch-toggle-tab label.switch');
    var TabTitle = $('#switch-toggle-tab li');
    var monthTabTitle = $('#switch-toggle-tab li.month');
    var yearTabTitle = $('#switch-toggle-tab li.year');
    var monthTabContent = $('#monthly');
    var yearTabContent = $('#yearly');
    // hidden show deafult;
    monthTabContent.fadeIn();
    yearTabContent.fadeOut();
  
    function toggleHandle() {
      if (toggleSwitch.hasClass('on')) {
        yearTabContent.fadeOut();
        monthTabContent.fadeIn();
        monthTabTitle.addClass('active');
        yearTabTitle.removeClass('active');
      } else {
        monthTabContent.fadeOut();
        yearTabContent.fadeIn();
        yearTabTitle.addClass('active');
        monthTabTitle.removeClass('active');
      }
    };
    monthTabTitle.on('click', function () {
      toggleSwitch.addClass('on').removeClass('off');
      toggleHandle();
      return false;
    });
    yearTabTitle.on('click', function () {
      toggleSwitch.addClass('off').removeClass('on');
      toggleHandle();
      return false;
    });
    toggleSwitch.on('click', function () {
      toggleSwitch.toggleClass('on off');
      toggleHandle();
    });

/* ==========================================================================
  // testimonial 2
  ========================================================================== */
    $('.testi-active').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay:false,
        asNavFor: '.testi-img-active'
    });
    $('.testi-img-active').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.testi-active',
        dots: false,
        prevArrow:'<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow:'<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        centerMode: true,
        focusOnSelect: true,
        centerPadding:0,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: true,

          }
        },
        {
          breakpoint: 670,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: true,

          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
          }
        }
  
      ]
    });
    /* ==========================================================================
      // brand-active
  ========================================================================== */
    $('.brand-active').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        // autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              dots: true,
            }
          },
          {
            breakpoint: 670,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 4,
              dots: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
            }
          }
    
        ]
      });

 /* ==========================================================================
     //popimg
  ========================================================================== */
$('.popimg').magnificPopup({
    type: 'image',
    // other options
    mainClass: 'mfp-with-zoom', // this class is for CSS animation below

    zoom: {
      enabled: true, 
  
      duration: 300, 
      easing: 'ease-in-out', 
      opener: function(openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    },
    gallery: {
        enabled: true
      }
  });

 /* ==========================================================================
     //popVideo
  ========================================================================== */
  
  $('#videolink,#videolinkpop').magnificPopup({
    type: 'iframe',
    midClick: true,
    iframe: {
      markup: '<style>.mfp-iframe-holder .mfp-content {max-width: 900px;height:500px;z-index:100000;}</style>' +
        '<div class="mfp-iframe-scaler" >' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" src="https://www.youtube.com/embed/US8ePkxYI3E?start=391" frameborder="0" allowfullscreen></iframe>' +
        '</div></div>'
    }
  });


/* ==========================================================================
    // map
  ========================================================================== */
  function basicmap() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
      // How zoomed in you want the map to start at (always required)
      zoom: 11,
      scrollwheel: false,
      // The latitude and longitude to center the map (always required)
      center: new google.maps.LatLng(32.941236, -97.134178), // New York
      // This is where you would paste any style found on Snazzy Maps.
      styles: [{
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [{
          "weight": "2.00"
        }]
      }, {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#9c9c9c"
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
          "color": "#f2f2f2"
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
          "saturation": -100
        }, {
          "lightness": 45
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#eeeeee"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#7b7b7b"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ffffff"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{
          "visibility": "simplified"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
          "color": "#46bcec"
        }, {
          "visibility": "on"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#c8d7d4"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#070707"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ffffff"
        }]
      }]
    };
    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('contact-map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(32.941236, -97.134178),
      map: map,
      title: 'Cryptox'
    });
  }
  if ($('#contact-map').length != 0) {
    google.maps.event.addDomListener(window, 'load', basicmap);
  }
  /* ==========================================================================
    // particles
  ========================================================================== */
  function particles(){
		if($('#particles').length > 0){
			particlesJS("particles", {
			  "particles": {
			    "number": {
			      "value": 100,
			      "density": {
			        "enable": true,
			        "value_area": 1443.0708547789707
			      }
			    },
			    "color": {
			      "value": "#ffffff"
			    },
			    "shape": {
			      "type": "circle",
			      "stroke": {
			        "width": 0,
			        "color": "#000000"
			      },
			      "polygon": {
			        "nb_sides": 5
			      },
			      "image": {
			        "src": "img/github.svg",
			        "width": 100,
			        "height": 100
			      }
			    },
			    "opacity": {
			      "value": 0,
			      "random": true,
			      "anim": {
			        "enable": false,
			        "speed": 1,
			        "opacity_min": 0.1,
			        "sync": false
			      }
			    },
			    "size": {
			      "value": 3,
			      "random": true,
			      "anim": {
			        "enable": false,
			        "speed": 40,
			        "size_min": 0.1,
			        "sync": false
			      }
			    },
			    "line_linked": {
			      "enable": true,
			      "distance": 212,
			      "color": "#ffffff",
			      "opacity": 0.30464829156444934,
			      "width": 2
			    },
			    "move": {
			      "enable": true,
			      "speed": 8.017060304327615,
			      "direction": "none",
			      "random": false,
			      "straight": false,
			      "out_mode": "out",
			      "bounce": false,
			      "attract": {
			        "enable": false,
			        "rotateX": 641.3648243462092,
			        "rotateY": 1200
			      }
			    }
			  },
			  "interactivity": {
			    "detect_on": "canvas",
			    "events": {
			      "onhover": {
			        "enable": true,
			        "mode": "grab"
			      },
			      "onclick": {
			        "enable": true,
			        "mode": "repulse"
			      },
			      "resize": true
			    },
			    "modes": {
			      "grab": {
			        "distance": 400,
			        "line_linked": {
			          "opacity": 1
			        }
			      },
			      "bubble": {
			        "distance": 400,
			        "size": 40,
			        "duration": 2,
			        "opacity": 8,
			        "speed": 3
			      },
			      "repulse": {
			        "distance": 200,
			        "duration": 0.4
			      },
			      "push": {
			        "particles_nb": 4
			      },
			      "remove": {
			        "particles_nb": 2
			      }
			    }
			  },
			  "retina_detect": true
			});
		}
	}
 /* ==========================================================================
      //wow animation
  ========================================================================== */
  var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 100,
    mobile: true,
    live: true,
    callback: function (box) {

    },
    scrollContainer: true,
    resetAnimation: true,
  });
  wow.init();

 /* ==========================================================================
      //counterUp
  ========================================================================== */
$('.counter-count').counterUp({
    delay: 10,
    time: 1000
});

particles()

})(jQuery);	    