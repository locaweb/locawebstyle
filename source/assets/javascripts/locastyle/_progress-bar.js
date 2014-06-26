var locastyle = locastyle || {};

locastyle.progressBar = (function() {
  'use strict';

  function init() {
    structureProgressBar();
  }

  function structureProgressBar() {
    $("[data-ls-module='progressBar']").each(function (index, item){
      var percentage = $(item).attr("aria-valuenow");
      $(item).append("<span aria-valuenow='"+percentage+"%'>");
      var $bar       = $(item).find('span');
      setProgressBarValue($bar, percentage);
    });
  }

  function setProgressBarValue(target, percentage) {
    $(target).css("width", percentage+"%");
  }

  return {
    init: init
  }

}());
