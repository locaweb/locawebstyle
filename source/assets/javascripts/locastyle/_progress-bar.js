var locastyle = locastyle || {};

locastyle.progressBar = (function() {
  'use strict';

  function init() {
    structureProgressBar();
  }

  function structureProgressBar() {
    $("[data-ls-module='progressBar']").each(function (index, element){
      var percentage = $(element).attr("aria-valuenow");
      $(element).append("<span aria-valuenow='"+percentage+"%'>");
        var $bar       = $(element).find('span');
      setProgressBarValue($bar, percentage);
    });
  }

  function setProgressBarValue(target, percentage) {
    $(target).css("width", percentage+"%");
  }

  return {
    init: init
  };

}());
