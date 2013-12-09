manual.tourGuiado = (function() {
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
        target: 'passo1',
        title: 'Titulo passo 1',
        content: 'descrição passo 1',
        placement: 'bottom',
        arrowOffset: 'center'
      },
      {
        target: 'passo2',
        title: 'Título passo 2',
        content: 'texto passo 2.',
        placement: 'left',
        arrowOffset: 'center',
        yOffset: 'center'
      },
      {
        target: 'demo-init',
        title: 'Título passo 3- Final',
        content: 'texto passo 3.',
        placement: 'right',
        arrowOffset: 'center',
        yOffset: 'center',
        showNextButton: false
      }

    ]
  };

  function init() {
    window.setTimeout(function(){
      locastyle.guidedTour.init(configTour);
    }, 1000)
  }

  return {
    init:init
  };

}());