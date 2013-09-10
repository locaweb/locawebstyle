var locastyle = locastyle || {};

locastyle.moduleSample = (function() {
  'use strict';

  function init(){
    //here goes what you need to be executed at loading
    myAwesomeFunction();
  }

  function myAwesomeFunction() {
    console.log("Awesome function executed in a module");
  }

  return {
    init: init,
    sample: myAwesomeFunction
  };

}());
