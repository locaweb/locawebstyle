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
      select2($form);
      toggleInputsEdit($form);
    });
  }

  function formReadOnly($form, disable){
    $form.prop('disabled', disable).toggleClass('ls-form-read-only');
    $form.find(':input, select').each(function(ii, input){
      $(input).prop('disabled', disable);
    });
  }

  function toggleInputsEdit(){
    $form.delegate('[data-enable-edit]', "click", function(evt) {
      evt.preventDefault();
      var editableContainer = $(this).data('enableEdit');
      $(editableContainer).find('[disabled]').prop('disabled', false)
    });
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
      if($($self).attr('type') == 'password'){
        $($self).removeAttr('attr').prop('type','text');
      } else
        $($self).removeAttr('attr').prop('type','password');
    });
  }

  function select2($form, exclude){
    $('.select2', $form).not(exclude).each(function(i, el){
      var $select = $(el);
      var $optionList = $select.find('option');
      var visible;
      if( $select.data('search') == false  ){
        visible = -1;
      } else {
        visible = ( $optionList.size() <= 10 ? -1 : 7 );
      }
      if( $select.attr('placeholder') && !$select.attr('multiple') ){
        if( $select.find('[selected]').size() === 0 ){
          $select.prepend('<option selected></option>');
        }else{
          $select.prepend('<option></option>');
        }
      }
      $select.select2({
        allowClear: true,
        minimumResultsForSearch: visible
      });
    });
  }

  return {
    init: init,
    insertDatepicker: claimDatePicker,
    insertSelect2: select2,
    insertMasks: inputsMask,
    formReadOnly: formReadOnly
  };

}());
