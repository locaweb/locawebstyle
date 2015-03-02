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
      $this.after('<p class="ls-help-inline"><small><strong class="ls-char-count ls-number-counter-'+$this.index()+'">0</strong> caracteres restantes</small></p>');

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
        // Parece que em alguns casos o enter conta como 2 caracteres
        // Contamos quantos existem no textarea e subtraimos do total
        countEnters = text.match(/(\r\n|\n|\r)/g),
        count = $this.attr('maxlength') - text.length - (countEnters == null ? 0 : countEnters.length)
    ;
    $('.ls-number-counter-'+$this.index()).text(count);
  }  

  return {
    init: init
  };

}());