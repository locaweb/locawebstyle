var locastyle = locastyle || {};

locastyle.form = (function() {
  'use strict';

  var config = {
    selectors: {
      disable: '.ls-form-disable',
      text: '.ls-form-text'
    }
  }

  function init() {

    formDisable();
    formText();

  }

  function formDisable () {
    $( config.selectors.disable ).each(function(ic, container){
      $(container).find(':input').each(function(ie, field){
        $(field).attr('disabled', 'disabled')
      });
    });
  }
  function formText ()
  {
    $( config.selectors.text ).each(function(ic, container){
      $(container).find(':input').each(function(ie, field){
        $(field).addClass('ls-form-text');
      });
    });
  }

  return {
    init: init,
  }

}());
