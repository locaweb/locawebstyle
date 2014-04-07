var locastyle = locastyle || {};

locastyle.customFields = (function() {
  'use strict';

  function init() {
    findFields();
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

      if($(field)[0].type === 'checkbox'){ customCheckbox($(field)); }

      if($(field)[0].type === 'radio'){ customRadio($(field)); }

    })
  }

  function setSize($field){
    $(".ls-field-container-" + $field[0].type ).css( { 'width': $field.width() } );
  }

  function fieldWrap($field){
    $('<span class="ls-field-custom-'+ $field[0].type + '"></span>').insertBefore($field[0]);
  }

  function labelField($field){
    return $field.siblings('.ls-field-custom-'+ $field[0].type);
  }

  function customSelect($field){
    var selectText = $field.children('option:selected').eq(0).text();
    $('<span class="ls-field-custom-'+ $field[0].type +'"> ' + selectText + ' </span>').insertBefore($field[0]);
    var $labelField = labelField($field)
    $field.on('change', function(){
      $labelField.text($field.find('option:selected').text())
    })
  }

  function customCheckbox($field){
    fieldWrap($field);
    var $labelField = labelField($field)
    $field.on('click', function(){
      $field.is(":checked") ? $labelField.addClass("checked") : $labelField.removeClass("checked")
    })
  }

  function customRadio($field){
    fieldWrap($field);

    $('.ls-input-original').on('click', function(){
      $('.ls-field-custom-radio').removeClass("checked");
    })

    var $labelField = labelField($field)
    $field.unbind('click');
    $field.on('click', function(){
      $('.ls-field-custom-radio').removeClass("checked");
      $field.is(":checked") ? $labelField.addClass("checked") : $labelField.removeClass("checked")
    });
  }

  return {
    init: init
  }

}());
