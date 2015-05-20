window.tourGuiadoDoc = {};

tourGuiadoDoc = (function() {
  'use strict';

  // configuration and steps guided tour
  var configTourDoc = {
    id: 'tourDemoDoc',
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
        title: 'O título do passo 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        placement: 'bottom',
        arrowOffset: 'center'
      },
      {
        target: 'passo2',
        title: 'Título passo 2',
        content: 'Este é o texto do passo 2: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        placement: 'left',
        arrowOffset: 'center'
      },
      {
        target: 'demo-init',
        title: 'Título passo 3- Final',
        content: 'Um textinho do passo 3. Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        placement: 'right',
        arrowOffset: 'center'
      }

    ]
  };

  function init() {
    locastyle.guidedTour.init(configTourDoc);
  }

  return {
    init:init
  };

}());

window.setTimeout(function(){
  tourGuiadoDoc.init();
}, 1000)
