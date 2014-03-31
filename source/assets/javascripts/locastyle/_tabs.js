var locastyle = locastyle || {};

locastyle.tabs = (function() {
  'use strict';

  function init() {
    bindClickOnTriggers();
  }

  function bindClickOnTriggers() {
    $(".ls-tabs-nav [data-module=tab]").on("click", function (evt) {
      evt.preventDefault();
      var $target = $($(this).attr("href"));
      deactivateTab(this, $target);
      activateTab(this, $target);
    });
  }

  function activateTab(el, $target) {
    $(el).parents("li").addClass("active");
    $target.addClass("active");
  }

  function deactivateTab(el, $target) {
    $(el).parents("li").siblings().removeClass("active");
    $target.siblings().removeClass("active");
  }

  return {
    init: init,
  }

}());
