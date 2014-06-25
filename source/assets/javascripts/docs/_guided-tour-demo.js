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
        target: '.ls-menu',
        title: 'Menu',
        content: 'Agora o Locaweb Style possui menu na lateral.',
        placement: 'right',
        arrowOffset: 'center',
        onNext: function(){
          $('.ls-submenu > a').click();
        }
      },
      {
        target: '.ls-ico-cog',
        title: 'SubMenu',
        content: 'Agora o Locaweb Style possui menu na lateral.',
        placement: 'right',
        arrowOffset: 'center',
        yOffset: 30,
        onPrev: function(){
          $('.ls-submenu > a').click();
        },
        onNext: function(){
          $('.ls-submenu > a').click();
        }
      },
      {
        target: '.ls-title-intro',
        title: 'Título Principal',
        content: 'Este é o título da página que você está.',
        placement: 'bottom',
        arrowOffset: 'center',
        yOffset: -30,
        xOffset: 10,
        onPrev: function(){
          $('.ls-submenu > a').click();
        },
      },
      {
        target: '.ls-footer',
        title: 'Footer',
        content: 'Este é o footer, que tem um título, links de apoio e textos informativos.',
        placement: 'top',
        arrowOffset: 'center',
        yOffset: 30,
        showNextButton: false
      }

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
