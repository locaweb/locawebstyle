var locastyle = locastyle || {};

locastyle.forms = (function() {
  'use strict';

  function init(dom_scope){
    var $forms = $('form', dom_scope);
    $forms.each(function(ifr, form){
      var $form = $(form);
      inputsMask($form);
      claimDatePicker($form);
      togglePassword($form);
      bindformEditable($form);
      bindformAsText($form);
      formDisable($form);
    });
    formEditable();
  }

  function formDisable($form){
    if( $form.attr('disabled') ){
      $form.find(':input, :checkbox, :radio').prop('disabled', true);
    }
  }

  function bindformEditable($form){
    $('[data-toggle-form-edit]', $form).on('click', function(evt){
      evt.preventDefault();
      var formId = $(this).data('toggle-form-edit');
      if( $(formId).attr('disabled') ){
        formEditable(formId, true);
      } else {
        formEditable(formId, false);
      }
    });
  }

  function formEditable(formId, editable){
    if( editable ){
      $(formId).removeAttr('disabled');
      $(formId).find(':input, :checkbox, :radio').removeAttr('disabled');
    } else {
      $(formId).attr('disabled', true);
      $(formId).find(':input, :checkbox, :radio').prop('disabled', true);
    }
  }

  function bindformAsText($form){
    $('[data-toggle-form-text]', $form).on('click', function(evt){
      evt.preventDefault();
      var destForm = $(this).data('toggle-form-text');
      $(destForm).toggleClass('ls-form-text');
    });
  }

  function formAsText(formId, asText){
    var destForm = $(this).data('toggle-form-text');
    if(asText){
      $(formId).addClass('ls-form-text');
    } else {
      $(formId).removeClass('ls-form-text');
    }
  }

  // Definindo padrões de classes para as máscaras de formulários.
  function inputsMask($form) {
    $('.date-mask', $form).mask('00/00/0000');
    $('.time-mask', $form).mask('00:00:00');
    $('.date-time-mask', $form).mask('00/00/0000 00:00:00');
    $('.cep-mask', $form).mask('00000-000');
    $('.phone-mask').mask('0000-0000');
    $('.phone-ddd-mask', $form).mask('(00) 0000-0000');
    $('.cel-sp-mask', $form).mask('(00) 00009-0000');
    $('.mixed-mask', $form).mask('AAA 000-S0S');
    $('.cpf-mask', $form).mask('000.000.000-00', {reverse: true});
  }

  // Implementando o Jquery DatePicker e nas configurações definindo a internacionalização.
  function claimDatePicker ($form, exclude) {
    $('.datepicker input', $form).not(exclude).datepicker({
      showOn: 'button',
      dateFormat: 'dd/mm/yy',
      monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
      monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
      dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
      dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
      onClose: function( selectedDate ) {
        if ($(this).hasClass('from-date')) {
          maxDateSetup(this, selectedDate);
        }
      }
    });
    var createWrap = '<span class="input-group-btn"></span>';
    $('.datepicker', $form).not(exclude).each(function () {
      if ($(this).find('.hasDatepicker').data('maxDate') === 'today' ) {
        $(this).find('.hasDatepicker').datepicker( "option", "maxDate", new Date() );
      };
      if ($(this).find('.hasDatepicker').data('minDate') === 'today' ) {
        $(this).find('.hasDatepicker').datepicker( "option", "minDate", new Date() );
      };
      $(this).append(createWrap);
      var parentGroupBtn = $(this).find('.input-group-btn');
      $(this).find('.ui-datepicker-trigger').addClass('ico-calendar btn btn-default').html('').appendTo(parentGroupBtn);
    });
  }

  // Fazendo Setup na data máxima
  function maxDateSetup(element, selectedDate) {
    var $dateRange = $(element).parents('.date-range');
    $dateRange.find('.to-date').datepicker( "option", "minDate", selectedDate );
    datepickerStyle($dateRange.find('.to-date'));
  }

  //Adicionando classes no botão
  function datepickerStyle (element) {
     var parentGroupBtn = $(element).parent().find('.input-group-btn');
    $(element).parent().find('.ui-datepicker-trigger').addClass('ico-calendar btn btn-default').html('').appendTo(parentGroupBtn);
  }

  // Troca de input password para text
  function togglePassword($form) {
    $('.toggle-pass', $form).on("click", function(e){
      e.preventDefault();
      var $self = $(this).data('target');
      if ($($self).attr('type') == 'password'){
        $($self).removeAttr('attr').prop('type','text');
      } else {
        $($self).removeAttr('attr').prop('type','password');
      }
    });
  }

  return {
    init: init,
    insertDatepicker: claimDatePicker,
    insertMasks: inputsMask,
    formEditable: formEditable,
    formAsText: formAsText
  };

}());
