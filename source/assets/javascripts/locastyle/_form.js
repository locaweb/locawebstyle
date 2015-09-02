var locastyle = locastyle || {};

locastyle.form = (function() {
  'use strict';

  var config = {
    selectors: {
      disable: '.ls-form-disable',
      text: '.ls-form-text'
    }
  };

  function init() {
    formDisable();
    formText();
    masks();
    textareaAutoresize();
    prefixSufix();
    togglePasswordField();
    textareaHeight();
    triggerCalendar();
  }

  function prefixSufix () {
    if(locastyle.breakpointClass === 'ls-window-xs'){
      $('.ls-label-text-sufix').parents('.ls-label').addClass('ls-label-text-has-sufix');
      $('.ls-label-text-prefix').parents('.ls-label').addClass('ls-label-text-has-prefix');
    } else{
      $('.ls-label-text-sufix').prev('[class*="col-"]')
        .addClass('ls-no-padding-right')
        .find(':input').addClass('ls-no-right-radius ls-border');
    }
  }

  function textareaAutoresize () {
    $('textarea.ls-textarea-autoresize', '.ls-label').each(function (index, textarea) {
      var $textarea = $(textarea);
      $textarea.keyup(function () {
        if (!$textarea.prop('scrollTop')) {
          var scrollHeight;
          do {
            scrollHeight = $textarea.prop('scrollHeight');
            var height = $textarea.height();
            $textarea.height(height - 5);
          } while (scrollHeight && (scrollHeight !== $textarea.prop('scrollHeight')));
        }
        $textarea.height($textarea.prop('scrollHeight') );
      });
    });
  }

  function textareaHeight (){
    $('textarea').each(function (index, textarea) {
      var text = $(textarea).val();
      var lines = text.split(/\r|\r\n|\n/);
      var count = lines.length;
      var total = count * 18;
      $(textarea).height(total + 'px');
    });
  }

  function masks() {
    $('.ls-mask-date').mask('11/11/1111');
    $('.ls-mask-time').mask('00:00:00');
    $('.ls-mask-date_time').mask('00/00/0000 00:00:00');
    $('.ls-mask-cep').mask('00000-000');
    $('.ls-mask-phone8').mask('0000-0000');
    $('.ls-mask-phone9').mask('00009-0000');
    $('.ls-mask-phone8_with_ddd').mask('(00) 0000-0000');
    $('.ls-mask-phone9_with_ddd').mask('(00) 00009-0000');
    $('.ls-mask-cpf').mask('000.000.000-00', {reverse: true});
    $('.ls-mask-cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('.ls-mask-money').mask("#.##0,00", {reverse: true, maxlength: false});
    $('.ls-mask-number').mask("#.##0", {reverse: true, maxlength: false});
    $('.ls-mask-ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}});
    $('.ls-mask-percent').mask('##0,00%', {reverse: true});
  }

  function formDisable() {
    $( config.selectors.disable ).each(function(indexContainer, container){
      var $container = $(container);
      $container.find(':input').each(function(indexField, field){
        var $field = $(field);
        $field.attr('disabled', 'disabled');
        $field.data('original-value', $field.val() );
      });
    });

  }

  function formText() {
    $( config.selectors.text ).each(function(indexContainer, container){
      $(container).find(':input').each(function(indexField, field){
        $(field).addClass('ls-form-text');
      });
      $(container).data('form-text', true);
    });
  }

  function dataToggleClass($element){
    if($($element).data('toggle-class') !== undefined){
      var getClass = $($element).data('toggle-class').split(',');
      $($element).toggleClass(getClass[0]).toggleClass(getClass[1]);
    }
  }

  function triggerCalendar() {
    $('[data-trigger-calendar]').on('click.ls', function(e) {
      var target = $(this).data('trigger-calendar');
      $(target).trigger('click.ls');
    });
  }

  function togglePasswordField(){
    $('.ls-toggle-pass').on("click", function(e){
      e.preventDefault();
      var target = $(this).data('target');
      dataToggleClass($(this));
      if ($(target).attr('type') === 'password'){
        $(target).removeAttr('attr').prop('type','text');
      } else {
        $(target).removeAttr('attr').prop('type','password');
      }
    });
  }

  return {
    init: init,
    togglePasswordField: togglePasswordField,
    triggerCalendar: triggerCalendar
  };

}());
