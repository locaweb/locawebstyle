var locastyle = locastyle || {};

locastyle.form = (function() {
  'use strict';

  var config = {
    selectors: {
      disable: '.ls-form-disable'
    }
  }

  function init() {

    formDisable();

  }

  function formDisable () {
    $( config.selectors.disable ).each(function(ic, container){
      $(container).find(':input').each(function(ie, field){
        console.log( $(field) )
        $(field).attr('disabled', 'disabled')
      });
    });
  }

  return {
    init: init,
  }

}());
