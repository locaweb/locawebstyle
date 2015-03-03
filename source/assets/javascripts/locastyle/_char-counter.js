var locastyle = locastyle || {};

locastyle.charCounter = (function() {
  'use strict';

  var $fields;

  function init() {
    $fields = $('[data-ls-module="charCounter"]');
    bind();
    countText();
  }

  function countText() {
    $fields.each(function(index, field) {
      var $this     = $(field);      
      if ($this.parent().find('.ls-number-counter-'+index).length == 0) {
        $this.attr('data-index', index).after('<p class="ls-help-inline"><small><strong class="ls-char-count ls-number-counter-'+index+'">0</strong> caracteres restantes</small></p>');  
      }
      updateCounter($this);
    });
  }

  function bind() {
    $fields.off("keyup.ls.charCounter").on("keyup.ls.charCounter", function(event) {              
      updateCounter($(this));
    });
  }

  function updateCounter(field) {
    var $this = $(field),
        text  = $this.val(),        
        countEnters = text.match(/(\r\n|\n|\r)/g),
        count = $this.attr('maxlength') - text.length - (countEnters == null ? 0 : countEnters.length)
    ;
    $('.ls-number-counter-'+$this.attr('data-index')).text(count);
  }

  return {
    init: init
  };

}());