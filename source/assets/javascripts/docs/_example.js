var lsexample = (function() {
  'use strict';

  function init() {
    activeMenu();
  }

  function activeMenu() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $(".documentacao_componentes .ls-menu a").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).closest('li').addClass('ls-active');
            $(this).parents('.ls-submenu-parent').find('a').trigger('click');
        }
    });
  }

  return {
    init:init
  };

}());

$(window).load(function() {
  lsexample.init();
});
