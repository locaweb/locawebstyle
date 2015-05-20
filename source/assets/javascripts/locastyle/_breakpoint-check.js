var locastyle = locastyle || {};

locastyle.breakpoints = (function() {
  'use strict';

  //
  // Sizes of breakpoints Standards
  //
  var config = {
    sm: '768',
    md: '992',
    lg: '1200',
    html: null
  };

  function init(userConfig) {
    config.html = $('html');

    breakpointWindowWidth(userConfig);
    breakpointScreenWidth(userConfig);
    changeClassBreakpoint();
  }

  //
  // Changes the css class in html tag according to the breakpoint size
  //
  function breakpointWindowWidth(userConfig) {
    var documentWidth;

    if (userConfig){
      documentWidth = userConfig.documentWidth;
    } else {
      documentWidth = $(document).width();
    }

    // If less than 768 - xs
    if (documentWidth < config.sm) {
      config.html.addClass('ls-window-xs');
      locastyle.breakpointClass = "ls-window-xs";
    }

    // If greater than or equal to 768 and less than 992 - sm
    else if (documentWidth >= config.sm && documentWidth < config.md) {
      config.html.addClass('ls-window-sm').removeClass('ls-sidebar-visible ls-notifications-visible ');
      locastyle.breakpointClass = "ls-window-sm";
    }

    // If greater than or equal to 992 and less than 1200 - md
    else if (documentWidth >= config.md && documentWidth < config.lg) {
      config.html.addClass('ls-window-md').removeClass('ls-sidebar-visible ls-notifications-visible ');
      locastyle.breakpointClass = "ls-window-md";
    }

    // If greater than or equal to 1200 - lg
    else {
      config.html.addClass('ls-window-lg').removeClass('ls-sidebar-visible ls-notifications-visible ');
      locastyle.breakpointClass = "ls-window-lg";
    }
  }

  //
  // Changing the class in html tag according to the screen .
  //
  function breakpointScreenWidth(userConfig) {
    var screenWidth;
    
    if (userConfig){
      screenWidth = userConfig.documentWidth;
    } else {
      screenWidth = screen.width;
    }

    // If less than 768 - xs
    if (screenWidth < config.sm) {
      config.html.addClass('ls-screen-xs');
      locastyle.breakpointScreenClass = "ls-screen-xs";
    }

    // If greater than or equal to 768 and less than 992 - sm
    else if (screenWidth >= config.sm && screenWidth < config.md) {
      config.html.addClass('ls-screen-sm');
      locastyle.breakpointScreenClass = "ls-screen-sm";
    }

    // If greater than or equal to 992 and less than 1200 - md
    else if (screenWidth >= config.md && screenWidth < config.lg) {
      config.html.addClass('ls-screen-md');
      locastyle.breakpointScreenClass = "ls-screen-md";
    }

    // If greater than or equal to 1200 - lg
    else {
      config.html.addClass('ls-screen-lg');
      locastyle.breakpointScreenClass = "ls-screen-lg";
    }
  }

  //
  // Changing the class in html tag when resized the window.
  //
  function changeClassBreakpoint() {

    var changeClass;

    $(window).resize(function() {
      clearTimeout(changeClass);

      changeClass = setTimeout(function() {

        var breakpointActive = config.html.attr('class').replace(/(^|\s)(ls-window-\S+)|(ls-screen-\S+)/g, '');

        config.html.attr('class', $.trim(breakpointActive));

        breakpointWindowWidth();
        breakpointScreenWidth();

        // event triggers to inform other modules that the breakpoint has been updated
        $.event.trigger("breakpoint-updated");
      }, 300);

    });
  }

  return {
    init: init
  };

}());
