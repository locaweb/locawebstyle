var locastyle = (function() {
  'use strict';

  function init(){
    bgShortcutWorkaround();
  }

  // Aquele background cinza que fica sempre atrás do elemento Shortcut
  // Não nos orgulhamos disso. Mas não havia maneira melhor de fazer. ;-)
  function bgShortcutWorkaround() {
    if ($(".shortcuts").length > 0){
      $('.main').prepend('<span class="bg-shortcut-workaround"></span>')
    }

    $( window ).resize(function() {
      $('.bg-shortcut-workaround').css('height', $('.shortcuts').outerHeight());
    });

  }

  return {
    init: init
  };

}());
