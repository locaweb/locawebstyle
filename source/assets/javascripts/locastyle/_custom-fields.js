var locastyle = locastyle || {};

locastyle.customFields = (function() {
  'use strict';

  function init() {
    findFields();
  }

  function findFields(){
    $('.ls-form').find(':input').not('.ls-input-original').each(function(index, field){
      if($(field)[0].type === 'select-one'){
        customSelect($(field));
      }
    })
  }

  function customSelect($field){
    $field.wrap( '<div class="ls-field-container-' + $field[0].type + '" />' );
    var selectText = $field.children('option:selected').eq(0).text();
    $('<span class="ls-field-custom-'+ $field[0].type +'"> ' + selectText + ' </span>').insertBefore($field[0]);
    var $labelField = $field.siblings('.ls-field-custom-'+ $field[0].type);
    $field.on('change', function(){
      $labelField.text($field.find('option:selected').text())
    })
  }

  return {
    init: init,
    findFields: findFields
  }

}());
