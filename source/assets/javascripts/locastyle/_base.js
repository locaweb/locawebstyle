var locastyle = (function() {
  'use strict';

  function init(){
    bgShortcutWorkaround();
    breakpointWindowWidth();
    inputsMask();
    claimDatePicker();
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
    var mediaMobile = 480
    var mediaTablet = 768
    var mediaDesk = 992
    var mediaDeskLg = 1200

    // Se for mobile
    if (screen.width <= mediaTablet) {
      $('html').addClass('media-mobile').removeClass('media-tablet media-desk media-desk-lg');
      locastyle.breakpoint = "media-mobile";
    } else {
      $('html').removeClass('media-mobile');
    }

    // Se for Tablet
    if (screen.width <= mediaDesk && screen.width >= mediaTablet) {
      $('html').addClass('media-tablet').removeClass('media-mobile media-desk media-desk-lg');
      locastyle.breakpoint = "media-tablet";
    } else {
      $('html').removeClass('media-tablet');
    }

    // Se for Desk
    if (screen.width <= mediaDeskLg && screen.width >= mediaDesk) {
      $('html').addClass('media-desk').removeClass('media-mobile media-tablet media-desk-lg');
      locastyle.breakpoint = "media-desk";
    } else {
      $('html').removeClass('media-desk');
    }

    // Se for Desk Large
    if (screen.width >= mediaDeskLg) {
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

    var createWrap = '<span class="input-group-btn"></span>'
    $('.datepicker').each(function () {
      $(this).append(createWrap);
      var parentGroupBtn = $(this).find('.input-group-btn');
      $(this).find('.ui-datepicker-trigger').addClass('ico-calendar btn btn-default').html('').appendTo(parentGroupBtn);
    });
  }


  return {
    init: init
  };

}());
