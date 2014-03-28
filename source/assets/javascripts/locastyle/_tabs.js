var locastyle = locastyle || {};

locastyle.tabs = (function() {
  'use strict';

  function init() {
    watchTabs();
  }

  function watchTabs() {
    $(".ls-tabs-nav [data-toggle=tab]").on("click", function () {
      activateTab($($(this).attr("href")));
    });
  }

  function activateTab($target) {
    $target.addClass("active");
  }

  return {
    init: init,
  }

}());
