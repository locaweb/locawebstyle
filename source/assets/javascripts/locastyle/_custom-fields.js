var locastyle = locastyle || {};

locastyle.customFields = (function() {
  'use strict';

  function init() {
    findFields();
  }

  function findFields(){
    $('[data-ls-module="customFields"]').find(':input').not('.ls-input-original').each(function(index, field){
      var fieldType = $(field)[0].type;
      var classParent = $(field).eq(0).attr('class');
      classParent = classParent !== undefined ? classParent : '';

      $(field).wrap( '<div class="ls-custom-' + fieldType + ' ' + classParent + '" />' );
      fieldSpan($(field));
    });
  }

  function fieldSpan($field){
    var selectText = $field.children('option:selected').eq(0).text();
    $('<span class="ls-field-custom-'+ $field[0].type + '">' + selectText + '</span>').insertAfter($field[0]);
    bindCustomSelect($field);
  }

  function siblingsField($field){
    return $field.siblings('.ls-field-custom-'+ $field[0].type);
  }

  function bindCustomSelect($field){
    unbind($field);
    var $siblingsField = siblingsField($field);
    $field.on('change.ls', function(){
      $siblingsField.text($field.find('option:selected').text());
    });
  }

  function unbind ($field) {
    $($field).off('change.ls');
  }

  return {
    init: init
  };

}());