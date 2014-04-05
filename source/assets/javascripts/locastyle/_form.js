var locastyle = locastyle || {};

locastyle.form = (function() {
  'use strict';

  function init() {

    formInline();

  }

  function formInline () {
    $('.ls-form-inline').each(function (iform, form) {
      var $form = $(form);
      $form.find('.ls-field').each(function (ifield, field ) {
        var $field = $(field);
        var $label = $field.find('.ls-label');
        var $input = $field.find(':input');

        var labelW = $label.width();
        var fieldW = $field.width();
        var inputW = $input.width();

        console.log(labelW, inputW,  fieldW)
        $input.width( fieldW-labelW-30)
      });
    });
  }

  return {
    init: init,
  }

}());
