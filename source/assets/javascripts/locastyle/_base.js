var locastyle = (function() {
  'use strict';

  function init(){
    bgShortcutWorkaround();
    breakpointWindowWidth();
    inputsMask();
    claimDatePicker();
    showActions();
  }

  // Aquele background cinza que fica sempre atrás do elemento Shortcut
  // Não nos orgulhamos disso. Mas não havia maneira melhor de fazer. ;-)
  function bgShortcutWorkaround() {
    if ($(".shortcut-box").length > 0) {
      $('.main').prepend('<span class="bg-shortcut-workaround"></span>');
      $('.bg-shortcut-workaround').css('height', $('.shortcut-box').outerHeight());
    }

    $( window ).resize(function() {
      $('.bg-shortcut-workaround').css('height', $('.shortcut-box').outerHeight());
    });
  }

  // Verifica qual breakpoint a janela está e insere uma classe no elemento HTML
  function breakpointWindowWidth() {
    var mediaMobile = 480;
    var mediaTablet = 768;
    var mediaDesk = 992;
    var mediaDeskLg = 1200;

    // Se for mobile
    if (document.width <= mediaTablet) {
      $('html').addClass('media-mobile').removeClass('media-tablet media-desk media-desk-lg');
      locastyle.breakpoint = "media-mobile";
    } else {
      $('html').removeClass('media-mobile');
    }

    // Se for Tablet
    if (document.width <= mediaDesk && document.width >= mediaTablet) {
      $('html').addClass('media-tablet').removeClass('media-mobile media-desk media-desk-lg');
      locastyle.breakpoint = "media-tablet";
    } else {
      $('html').removeClass('media-tablet');
    }

    // Se for Desk
    if (document.width <= mediaDeskLg && document.width >= mediaDesk) {
      $('html').addClass('media-desk').removeClass('media-mobile media-tablet media-desk-lg');
      locastyle.breakpoint = "media-desk";
    } else {
      $('html').removeClass('media-desk');
    }

    // Se for Desk Large
    if (document.width >= mediaDeskLg) {
      $('html').addClass('media-desk-lg').removeClass('media-mobile media-tablet media-desk');
      locastyle.breakpoint = "media-desk-lg";
    } else {
      $('html').removeClass('media-desk-lg');
    }
  }

  // Definindo padrões de classes para as máscaras de formulários.
  function inputsMask() {
    $('.date-mask').mask('00/00/0000');
    $('.time-mask').mask('00:00:00');
    $('.date-time-mask').mask('00/00/0000 00:00:00');
    $('.cep-mask').mask('00000-000');
    $('.phone-mask').mask('0000-0000');
    $('.phone-ddd-mask').mask('(00) 0000-0000');
    $('.cel-sp-mask').mask('(00) 00009-0000');
    $('.mixed-mask').mask('AAA 000-S0S');
    $('.cpf-mask').mask('000.000.000-00', {reverse: true});
  }

  // Implementando o Jquery DatePicker e nas configurações definindo a internacionalização.
  function claimDatePicker () {
    $('.datepicker input').datepicker({
      showOn: 'button',
      dateFormat: 'dd/mm/yy',
      monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
      monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
      dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
      dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
    });

    var createWrap = '<span class="input-group-btn"></span>';

    $('.datepicker').each(function () {
      $(this).append(createWrap);
      var parentGroupBtn = $(this).find('.input-group-btn');
      $(this).find('.ui-datepicker-trigger').addClass('ico-calendar btn btn-default').html('').appendTo(parentGroupBtn);
    });
  }

  // Quando as tabelas tiverem checkboxes e mais de dois checkboxes forem marcados, será exibido um box com ações (ex: excluir, enviar, duplicar e etc).
  function showActions () {
    $('.table-style').each(function() {

      var $tableStyle = $(this);
      var $wellTableId = $(this).prop('id');
      var $checkAll   = $tableStyle.find('th input[type="checkbox"]');
      var $checkboxes = $tableStyle.find('td input[type="checkbox"]');

      // Quando clica no checkbox principal, seleciona todos os outros
      $checkAll.on('change', function(){
        $checkboxes.prop('checked', $checkAll.prop('checked') )
        showWellTable();
      });

      // Quando seleciona todos os checkboxes, seleciona o checkbox principal também
      $checkboxes.on('change', function () {
        $checkAll.prop('checked', $tableStyle.find('td input[type="checkbox"]:checked').size() == $checkboxes.size() );
        showWellTable();
      });

      function showWellTable() {
        // Verifica quantidade de itens checados para mostrar as opções de ação
        if ( $tableStyle.find('td input[type="checkbox"]:checked').size() > 1 ) {
          $('[data-target="'+ $wellTableId +'"]').removeClass('hidden');
        } else {
          $('[data-target="'+ $wellTableId +'"]').addClass('hidden');
        }

        // Conta quantos checkboxes existe checados e marca no Counter
        $('[data-target="'+ $wellTableId +'"]').find('.counterChecks').html($tableStyle.find('td input[type="checkbox"]:checked').size());
      }

    });

  }

  return {
    init: init
  };

}());
