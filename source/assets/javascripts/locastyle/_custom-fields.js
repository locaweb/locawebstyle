var locastyle = locastyle || {};

locastyle.customFields = (function() {
  'use strict';

  function init() {
    customSelect();
  };

  function customSelect(){
    $('.ls-custom-select').wrap(function(){
      var selectClasses = $(this).attr('class');
      $(this).removeAttr('class').addClass('ls-select');
      return '<div class="'+selectClasses+'"></div>';
    });
  };

  return {
    init: init
  };

}());
