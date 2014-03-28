var locastyle = locastyle || {};

locastyle.tabs = (function() {
  'use strict';

  function init() {
    bindClickOnTriggers();
  }

  function bindClickOnTriggers() {
    $(".ls-tabs-nav [data-toggle=tab]").on("click", function (evt) {
      evt.preventDefault();
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
