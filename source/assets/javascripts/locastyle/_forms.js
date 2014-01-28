var locastyle = locastyle || {};

locastyle.forms = (function() {
  'use strict';

  var $forms = $('form', 'body');

  function init(){
    $forms.each(function(ifr, form){
      var $form = $(form);
      inputsMask($form);
      claimDatePicker($form);
      togglePassword($form);
      bindToggleFormEdit($form);
      bindToggleFormText($form);
      formDisable($form);
    });
    // toggleFormText();
    toggleFormEdit();
  }

  function formDisable($form){
    if( $form.attr('disabled') ){
      $form.find(':input, :checkbox, :radio').prop('disabled', true);
    }
  }

  function bindToggleFormEdit($form){
    $('[data-toggle-form-edit]', $form).on('click', function(evt){
      evt.preventDefault();
      var formId = $(this).data('toggle-form-edit');
      if( $(formId).attr('disabled') ){
        toggleFormEdit(formId, true);
      } else {
        toggleFormEdit(formId, false);
      }
    });
  }

  function toggleFormEdit(formId, editable){
    if( editable ){
      $(formId).removeAttr('disabled');
      $(formId).find(':input, :checkbox, :radio').removeAttr('disabled');
    } else {
      $(formId).attr('disabled', true);
      $(formId).find(':input, :checkbox, :radio').prop('disabled', true);
    }
  }

  function bindToggleFormText($form){
    $('[data-toggle-form-text]', $form).on('click', function(evt){
      evt.preventDefault();
      var destForm = $(this).data('toggle-form-text');
      $(destForm).toggleClass('ls-form-text');
    });
  }

  function toggleFormText(formId, asText){
    var destForm = $(this).data('toggle-form-text');
    $(formId).toggleClass('ls-form-text', asText);
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
      dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
    });
    var createWrap = '<span class="input-group-btn"></span>';
    $('.datepicker', $form).not(exclude).each(function () {
      $(this).append(createWrap);
      var parentGroupBtn = $(this).find('.input-group-btn');
      $(this).find('.ui-datepicker-trigger').addClass('ico-calendar btn btn-default').html('').appendTo(parentGroupBtn);
    });
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
    toggleFormEdit: toggleFormEdit,
    toggleFormText: toggleFormText
  };

}());
