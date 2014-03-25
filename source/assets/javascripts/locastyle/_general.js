var locastyle = locastyle || {};
locastyle.general = (function() {
  'use strict';

  function init() {

    $(config.selector).each(function(i, collapse){
      console.log(collapse);
    });

  }

  return {
    init:init
  };

}());
