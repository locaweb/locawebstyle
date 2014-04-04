var locastyle = locastyle || {};

locastyle.customFields = (function() {
  'use strict';

  function init() {
    findFields();
  }

  function findFields(){
    $('.ls-form').find(':input').not('.ls-input-original').each(function(index, field){
      $(field).wrap( '<div class="ls-field-container-' + $(field)[0].type + '" />' );

      setSize($(field))

      if($(field)[0].type === 'select-one'){
        customSelect($(field));
      }

      if($(field)[0].type === 'checkbox'){
        customCheckbox($(field));
      }

    })
  }

  function setSize($field){
    $(".ls-field-container-" + $field[0].type ).css( { 'width': $field.width() } );
  }

  function customSelect($field){
    var selectText = $field.children('option:selected').eq(0).text();
    $('<span class="ls-field-custom-'+ $field[0].type +'"> ' + selectText + ' </span>').insertBefore($field[0]);
    var $labelField = $field.siblings('.ls-field-custom-'+ $field[0].type);
    $field.on('change', function(){
      $labelField.text($field.find('option:selected').text())
    })
  }

  function customCheckbox($field){
    $('<span class="ls-field-custom-'+ $field[0].type +'"></span>').insertBefore($field[0]);
    var $labelField = $field.siblings('.ls-field-custom-'+ $field[0].type);
    $field.on('click', function(){
      $field.is(":checked") ? $labelField.addClass("checked") : $labelField.removeClass("checked")
    })
  }

  return {
    init: init
  }

}());
