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
    datepicker();
    togglePasswordField();
  }

  function datepicker () {
    $('.datepicker').pikaday({
      numberOfMonths: 1,
      format: 'DD/MM/YYYY',
      i18n: {
        previousMonth : 'Mês anterior',
        nextMonth     : 'Próximo mês',
        months        : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        weekdays      : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
        weekdaysShort : ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
      }
    });
  }

  function prefixSufix () {
    if(locastyle.breakpointClass === 'ls-screen-xs'){
      $('.ls-label-text-sufix').parents('.ls-label').addClass('ls-label-text-has-sufix');
      $('.ls-label-text-prefix').parents('.ls-label').addClass('ls-label-text-has-prefix');
    } else{
      $('.ls-label-text-sufix').prev('[class*="col-"]')
        .addClass('ls-no-padding-right')
        .find(':input').addClass('ls-no-right-radius ls-border');
    }
  }

  function textareaAutoresize (argument) {
    $('textarea.ls-textarea-autoresize', '.ls-label').each(function (index, textarea) {
      var $textarea = $(textarea);
      var height = $textarea.height();
      $textarea.keyup(function (e) {
        var scrollHeight;
        if (!$textarea.prop('scrollTop')) {
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
      setOriginalValue();
    });
  }

  function setOriginalValue() {
    var $button = $('[data-ls-fields-enable]');
    $button.on('click', function (evt) {
      var $container = $($(this).data('ls-toggle-fields'));
      $container.find(':input').each(function(indexField, field){
        var $field = $(field);
        $field.val($field.data('original-value'));
      });
    });
  }

  function formText() {
    $( config.selectors.text ).each(function(indexContainer, container){
      $(container).find(':input').each(function(indexField, field){
        $(field).addClass('ls-form-text');
      });
    });
  }

  function dataToggleClass($element){
    if($($element).data('toggle-class') !== undefined){
      var getClass = $($element).data('toggle-class').split(',');
      $($element).toggleClass(getClass[0]).toggleClass(getClass[1]);
    }
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
    togglePasswordField: togglePasswordField
  };

}());
