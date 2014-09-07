---
---
{% include javascript/jquery-1.11.1.min.js %}
{% include javascript/turbolinks.js %}
{% include javascript/modernizr.js %}
{% include javascript/scrollr.js %}
{% include javascript/jquery.sharrre.js %}

if (Modernizr.touch)
  skrollr.init().destroy();
else
  var s = skrollr.init();

initialize_post();

function initialize_post() {
  var share_buttons = $('.share-buttons');

  // fix for vh bug in iOS7
  var iOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/);
  if(iOS){
    function iosVhHeightBug() {
      var height = $(window).height();
      $(".main-image-clear, .post-main-image, .image-h1-wrapper-outer").css('height', height);
    }

    iosVhHeightBug();
    $(window).bind('resize', iosVhHeightBug);
  }

  if (share_buttons.length) {
    var share_buttons_position = share_buttons.offset();

    $(window).scroll(function() {
      if($(this).width() > 979) {
        if($(this).scrollTop() > ( share_buttons_position.top - 88 ) ) {
          share_buttons.css('position','fixed').css('top','88px');
        } else {
          share_buttons.css('position','absolute').css('top', '0');
        }
      }
    });

    $(window).resize(function() {
      // on window resize, unset any styles to the share buttons
      if($(this).width() < 979) {
        $('.share-buttons').attr('style', '');
      }
    });

    $('#shareme').sharrre({
      share: {
        twitter: true,
        facebook: true,
        googlePlus: true
      },
      urlCurl: 'http://become-fluent.com/sharrre.php',
      template: '<span></span>',
      enableHover: false,
      enableTracking: true,
      render: function(api, options){
        $('.share-count.facebook').html(options.count.facebook);
        $('.share-count.twitter').html(options.count.twitter);
        $('.share-count.googleplus').html(options.count.googlePlus);
      }
    });

    // make share links open in popup
    $('.share-link').on('click', function(e) {
      var _this = $(this);
      popupCenter(_this.attr('href'), _this.find('.text').html(), 580, 470);
      e.preventDefault();
    });

    var popupCenter = function(url, title, w, h) {
      // Fixes dual-screen position                         Most browsers      Firefox
      var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
      var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

      var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

      var left = ((width / 2) - (w / 2)) + dualScreenLeft;
      var top = ((height / 3) - (h / 3)) + dualScreenTop;

      var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus();
      }
    };
  }
}