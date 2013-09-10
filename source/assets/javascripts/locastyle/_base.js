var locastyle = (function() {
  'use strict';

  function init(){
    //here goes what you need to be executed at loading
    myAwesomeFunction();
  }

  function myAwesomeFunction() {
    console.log("Awesome function executed");
  }

  return {
    init: init,
    sample: myAwesomeFunction
  };

}());
