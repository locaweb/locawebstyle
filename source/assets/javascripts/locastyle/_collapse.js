var locastyle = locastyle || {};
locastyle.collapse = (function() {
  'use strict';

  var config = {
    selector: '.ls-collapse'
  };

  function init() {

    $(config.selector).each(function(i, collapse){
      console.log(collapse);
    });

  }

  return {
    init:init
  };

}());
