Locastyle.prototype.stepForm = (function() {
  'use strict';

  function init(){
    collapseButtonNav();
  }

  function collapseButtonNav(){
    if( jQuery().validate ){
      $('.accordion').each(function(i,e){
        $(this).find('.accordion-toggle').on('click', function(e){
          if( !$(this).parents('form').valid() ){
            e.preventDefault();
          }
        });
      });
    }
  }

  return {
    init: init
  };

}());
