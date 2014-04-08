var locastyle = locastyle || {};

locastyle.customFields = (function() {
  'use strict';

  function init() {
    findFields();
    bindRemoveCustomClass();
  }

  function findFields(){
    $('.ls-custom').find(':input').not('.ls-input-original').each(function(index, field){
      if($(field).eq(0).attr('class') !== undefined){
        $(field).wrap( '<div class="ls-field-container-' + $(field)[0].type + ' ' + $(field).eq(0).attr('class') + ' " />' );
      }else{
        $(field).wrap( '<div class="ls-field-container-' + $(field)[0].type + ' " />' );
      }

      setSize($(field))

      if($(field)[0].type === 'select-one'){ customSelect($(field)); }

      if($(field)[0].type === 'checkbox'){ customCheckbox($(field)); checkInputs($(field))}

      if($(field)[0].type === 'radio'){ customRadio($(field)); checkInputs($(field)) }

    })
  }

  function setSize($field){
    $(".ls-field-container-" + $field[0].type ).css( { 'width': $field.width() } );
  }

  function fieldSpan($field){
    $('<span class="ls-field-custom-'+ $field[0].type + '"></span>').insertBefore($field[0]);
  }

  function labelField($field){
    return $field.siblings('.ls-field-custom-'+ $field[0].type);
  }

  // Select
  function customSelect($field){
    var selectText = $field.children('option:selected').eq(0).text();
    $('<span class="ls-field-custom-'+ $field[0].type +'"> ' + selectText + ' </span>').insertBefore($field[0]);
    bindCustomSelect($field)
  }

  function bindCustomSelect($field){
    var $labelField = labelField($field)
    $field.on('change', function(){
      $labelField.text($field.find('option:selected').text())
    })
  }

  // Checkbox
  function customCheckbox($field){
    fieldSpan($field);
    bindCustomCheckbox($field)
  }

  function bindCustomCheckbox($field){
    var $labelField = labelField($field)
    $field.on('click', function(){
      $field.is(":checked") ? $labelField.addClass("checked") : $labelField.removeClass("checked")
    })
  }
  // Radio
  function customRadio($field){
    fieldSpan($field);
    bindCustomRadio($field);
  }

  function bindCustomRadio($field){
    $field.on('click', function(){
      uncheckInputs($field);
      checkInputs($field)
    });
  }

  function uncheckInputs($field){
    var group = $field.attr("name");
    $field.parents().find('.ls-field-custom-radio').removeClass("checked");
  }

  function checkInputs($field){
    var $labelField = labelField($field);
    if($field.is(":checked")){
      $labelField.addClass("checked")
    }
  }

  function bindRemoveCustomClass(){
    $('.ls-input-original').on('click', function(){
      $('.ls-field-custom-radio').removeClass("checked");
    });
  }


  return {
    init: init
  }

}());
