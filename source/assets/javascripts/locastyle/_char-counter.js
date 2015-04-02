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
      var $this = $(field);
      if ($this.parent().find('.ls-number-counter-' + index).length === 0) {
        $this.attr('data-index', index).after('<p class="ls-help-inline"><small><strong class="ls-char-count ls-number-counter-' + index + '">0</strong> caracteres restantes</small></p>');
      }
      updateCounter($this);
    });
  }

  function bind() {
    $fields.off("input.ls.charCounter propertychange.ls.charCounter").on("input.ls.charCounter propertychange.ls.charCounter", function() {
      updateCounter($(this));
    });
  }

  function updateCounter(field) {
    var $this = $(field),
        text  = $this.val(),
        max   = $this.attr('maxlength'),
        enters = countEnters(text),
        counter = 0
    ;

    if (text.length + enters > max) {
        $this.val( text.substring(0, max - enters) );
        text = $this.val();
        enters = countEnters(text);
    }

    counter = max - (text.length + enters);

    $('.ls-number-counter-' + $this.attr('data-index')).text(counter);
  }
  function countEnters(text) {
    return (text.match(/\n/g) || []).length;
  }

  return {
    init: init
  };

}());