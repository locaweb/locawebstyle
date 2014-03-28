var locastyle = locastyle || {};

locastyle.tabs = (function() {
  'use strict';

  function init() {
    watchTabs();
  }

  function watchTabs() {
    $(".ls-tabs-nav [data-toggle=tab]").on("click", function () {
      var $target = $($(this).attr("href"));
      deactivateTab($target);
      activateTab($target);
    });
  }

  function activateTab($target) {
    $target.addClass("active");
  }

  function deactivateTab($target) {
    $target.siblings().removeClass("active");
  }

  return {
    init: init,
  }

}());
