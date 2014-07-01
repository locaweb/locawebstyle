var locastyle = locastyle || {};

locastyle.trackEvents = (function() {
  'use strict';

  function init(){
    if(window.ga){
      this.gaPresent = true;
    } else {
      this.gaPresent = false;
    }
  }

  return {
    init: init
  };

}());
