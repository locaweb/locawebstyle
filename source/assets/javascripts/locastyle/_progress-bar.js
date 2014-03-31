var locastyle = locastyle || {};

locastyle.progress = (function() {
  'use strict';

  // Default config
  var config = {
  }

  function init() {
    $('.ls-progress').each(function(index, progressbar){
      var $progressbar = $(progressbar);
    });
  }



  return {
    init: init,
    destroyPopover: destroyPopover
  }

}());
