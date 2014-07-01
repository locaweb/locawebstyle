var locastyle = locastyle || {};

locastyle.form = (function() {
  'use strict';

  var config = {
    selectors: {
      disable: '.ls-form-disable',
      text: '.ls-form-text'
    }
  }

  function init() {

    formDisable();
    formText();
    masks();
    textareaAutoresize();
    prefixSufix();
    datepicker();

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
    if(locastyle.breakpointClass == 'ls-screen-xs'){
      $('.ls-label-sufix').parents('.ls-field').addClass('ls-label-has-sufix');
      $('.ls-label-prefix').parents('.ls-field').addClass('ls-label-has-prefix');
    } else{
      $('.ls-label-sufix').prev('[class*="col-"]')
        .addClass('ls-no-padding-right')
        .find(':input').addClass('ls-no-right-radius ls-border');
    }
  }

  function textareaAutoresize (argument) {
    $('textarea.ls-textarea-autoresize', '.ls-field').each(function (index, textarea) {
      var $textarea = $(textarea);
      var height = $textarea.height();
      $textarea.keyup(function (e) {
        if (!$textarea.prop('scrollTop')) {
          do {
            var b = $textarea.prop('scrollHeight');
            var h = $textarea.height();
            $textarea.height(h - 5);
          } while (b && (b != $textarea.prop('scrollHeight')));
        };
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
    var $button = $('[data-ls-toggle-fields]');
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

  return {
    init: init,
  }

}());
