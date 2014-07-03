window.tourGuiado = {};

tourGuiado = (function() {
  'use strict';

  // configurações e passos do tour
  var configTour = {
    id: 'tourDemo',
    selectors: {
      init:  '#demo-init'
    },
    i18n: {
      nextBtn: "Próximo",
      prevBtn: "Anterior",
      doneBtn: "Ok",
      skipBtn: "Sair",
      closeTooltip: "Fechar"
    },
    bubbleWidth: 250,
    showPrevButton: true,
    steps: [
      {
        target: '.ls-brand-name',
        title: 'Nome do Projeto',
        content: 'Aqui fica o nome do projeto',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: 20
      },
      {
        target: '.ls-menu',
        title: 'Menu',
        content: 'Agora o Locaweb Style possui menu na lateral.',
        placement: 'right',
        arrowOffset: 'center',
        onNext: function(){
          $('.ls-submenu:not(".ls-active") > a').click();
        }
      },
      {
        target: '.ls-menu .ls-ico-cog',
        title: 'SubMenu',
        content: 'Agora o Locaweb Style possui menu na lateral.',
        placement: 'right',
        arrowOffset: 'center',
        yOffset: 30
      },
      {
        target: '.ls-title-intro',
        title: 'Título Principal',
        content: 'Este é o título da página que você está.',
        placement: 'bottom',
        arrowOffset: 'center',
        yOffset: -30,
        xOffset: 10

      },
      {
        target: '.ls-footer',
        title: 'Footer',
        content: 'Este é o footer, que tem um título, links de apoio e textos informativos.',
        placement: 'top',
        arrowOffset: 'center',
        yOffset: 30,
        onNext: function(){
          $('.ls-alerts-list .ls-ico-bell-o').trigger('click');
        }
      },
      {
        target: 'ls-notification-curtain',
        title: 'Notificações',
        content: 'Esta é a area para Notificações do Painel',
        placement: 'left',
        arrowOffset: 'center',
        xOffset: 30,
        onPrev: function(){
          $('.ls-alerts-list .ls-ico-bell-o').trigger('click');
        },
        onNext: function(){
          $('.ls-alerts-list .ls-ico-bell-o').trigger('click');
          $('.ls-user-account a:eq(0)').trigger('click');
        }
      },
      {
        target: '.ls-user-account .ls-dropdown-nav',
        title: 'Dados da conta',
        content: 'Este é o menu para dados da conta do usuário',
        placement: 'left',
        arrowOffset: 'center',
        xOffset: 30,
        onPrev: function(){
          $('.ls-ico-bell-o').trigger('click');
        },
      },

    ]
  };

  function init() {
    locastyle.guidedTour.init(configTour);
  }

  return {
    init:init
  };

}());

window.setTimeout(function(){
  tourGuiado.init();
}, 1000)
