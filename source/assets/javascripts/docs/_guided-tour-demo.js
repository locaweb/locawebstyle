window.tourGuiado = {};

tourGuiado = (function() {
  'use strict';

  // configurações e passos do tour
  var tourFirstStep = {
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
        content: 'Acesse de forma rápida os recursos mais importantes.',
        placement: 'right',
        arrowOffset: 'center'
      },
      {
        target: '.ls-ico-dashboard',
        title: 'Consumo',
        content: 'Acompanhe o consumo dos envios do seu plano no período.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-ico-user-add .ls-btn-primary',
        title: 'Comece por aqui',
        content: 'Cadastre seus clientes e adicione envios.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-ico-user-add ~ .ls-title-3',
        title: 'Personalize sua revenda',
        content: 'Siga os passos abaixo para personalizar sua revenda.',
        placement: 'top',
        arrowOffset: 'center',
        xOffset: -75,
        onNext: function(){
          $('.ls-user-account').addClass('ls-active');
        }
      },
      {
        target: '.ls-user-account .ls-dropdown-nav',
        title: 'Sua conta',
        content: 'Detalhes de seu login Locaweb.',
        placement: 'left',
        arrowOffset: 'center',
        xOffset: 30,
        onNext: function(){
          $('.ls-user-account').removeClass('ls-active');
        },
        onPrev: function(){
          $('.ls-user-account').removeClass('ls-active');
        }
      },
      {
        target: '.ls-alerts-list',
        title: 'Ajude a melhorar o painel',
        content: 'Fique à vontade para enviar sugestões e comentários.',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: -90,
        onPrev: function(){
          $('.ls-user-account').addClass('ls-active');
        }
      }

    ]
  };


  var tourDashboard = {
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
        content: 'Acesse de forma rápida os recursos mais importantes.',
        placement: 'right',
        arrowOffset: 'center'
      },
      {
        target: '.ls-ico-dashboard',
        title: 'Consumo',
        content: 'Acompanhe o consumo dos envios do seu plano no período.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-board-box ~ .ls-title-3',
        title: 'Cliente que contrataram',
        content: 'Acompanhe os clientes que mais contrataram no período.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.col-md-6 .ls-title-3',
        title: 'Sem saldo de envio',
        content: 'Saiba quais clientes estão sem saldo e ofereça mais envios.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.col-md-6:nth-child(2) .ls-title-3',
        title: 'Bloqueados por bounce',
        content: 'Saiba quais clientes foram bloqueados por abuso de bounces. Consulte a <a href="http://wiki.locaweb.com.br/pt-br/Bounces" target="_blank">política de bounce</a>.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-alerts-list',
        title: 'Ficou com dúvidas?',
        content: 'Acesse nossos canais de ajuda.',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: -50,
        onNext: function(){
          $('.ls-user-account').addClass('ls-active');
        },
      },
      {
        target: '.ls-user-account .ls-dropdown-nav',
        title: 'Sua conta',
        content: 'Detalhes de seu login Locaweb.',
        placement: 'left',
        arrowOffset: 'center',
        xOffset: 30,
        onNext: function(){
          $('.ls-user-account').removeClass('ls-active');
        },
        onPrev: function(){
          $('.ls-user-account').removeClass('ls-active');
        }
      },
      {
        target: '.ls-alerts-list',
        title: 'Ajude a melhorar o painel',
        content: 'Fique à vontade para enviar sugestões e comentários.',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: -90,
        onPrev: function(){
          $('.ls-user-account').addClass('ls-active');
        }
      }
    ]
  };


  var tourClient = {
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
        target: '.ls-main .ls-btn-primary',
        title: 'Cadastre um novo cliente',
        content: 'Adicione seus novos clientes.',
        placement: 'top',
        arrowOffset: 'center',
        xOffset: -75,
      },
      {
        target: '.ls-box-filter form:nth-child(2) input',
        title: 'Busca de cliente',
        content: 'Procure um cliente por status ou por nome.',
        placement: 'left',
        arrowOffset: 'center',
        yOffset: -55,
        xOffset: 30
      },
      {
        target: '.ls-table th:nth-child(3)',
        title: 'Validade dos envios do cliente',
        content: 'Acompanhe a quantidade e validade de uso dos envios para este cliente.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-table tr:nth-child(1) .ls-regroup .ls-btn',
        title: 'Administre seu cliente',
        content: 'Edite os dados, a distribuição de envios e acompanhe o uso de cada cliente.',
        placement: 'left',
        arrowOffset: 'center',
        yOffset: -70,
        xOffset: 35
      }
    ]
  };


  var tourRegisterClient = {
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
        target: '.ls-form legend:nth-child(1)',
        title: 'Informações do seu cliente',
        content: 'Preencha os dados do seu cliente e defina uma senha para ele acessar o painel.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-box-gray .ls-field:nth-child(2)',
        title: 'Quantidade de envios',
        content: 'Defina a quantidade de envios que seu cliente poderá utilizar.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-box-gray .ls-field:nth-child(3)',
        title: 'Recorrência',
        content: 'Marque se ele vai receber esta mesma quantidade todo mês.',
        placement: 'top',
        arrowOffset: 'center'
      }
    ]
  };


  var tourAdminClient = {
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
        target: '.ls-regroup .ls-btn-primary',
        title: 'Acesso ao painel do seu cliente',
        content: 'Tenha acesso ao painel do cliente. Você poderá visualizar mensagens enviadas, relatórios e as configurações feita pelo seu cliente.',
        placement: 'left',
        arrowOffset: 'center',
        yOffset: -70,
        xOffset: 35,
        onNext: function(){
          $('.ls-main .ls-dropdown .ls-btn').click();
        },
      },
      {
        target: '.ls-dropdown .ls-btn',
        title: 'Gerencie seu cliente',
        content: 'Edite os dados, altere a senha ou desative o cliente.',
        placement: 'left',
        arrowOffset: 'center',
        xOffset: -90,
        yOffset: 20,
        onNext: function(){
          $('.ls-main .ls-dropdown .ls-btn').click();
        },
        onPrev: function(){
          $('.ls-main .ls-dropdown .ls-btn').click();
        },
      },
      {
        target: '.ls-ico-calendar-check',
        title: 'Envios disponíveis dos períodos',
        content: 'Altere a quantidade de envios disponíveis no período atual ou no próximo período.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-main h3.ls-title-3',
        title: 'Relatórios',
        content: 'Acompanhe o relatório de contratação e uso dos envios.',
        placement: 'top',
        arrowOffset: 'center',
        xOffset: -75,
      },
      {
        target: '.container-fluid > .ls-title-3',
        title: 'Histórico',
        content: 'Acompanhe o histórico de distribuição de envios.',
        placement: 'top',
        arrowOffset: 'center'
      }
    ]
  };

  var tourStats = {
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
        target: '.ls-tabs-nav',
        title: 'Relatórios da sua revenda',
        content: 'Acompanhe a distribuição de envios e dos status de seus clientes.',
        placement: 'top',
        arrowOffset: 'center',
      }

    ]
  };



  function firstTour() {
    locastyle.guidedTour.init(tourFirstStep);
  }

  function homeTour() {
    locastyle.guidedTour.init(tourDashboard);
  }

  function clientTour() {
    locastyle.guidedTour.init(tourClient);
  }

  function registerClientTour() {
    locastyle.guidedTour.init(tourRegisterClient);
  }

  function adminClientTour() {
    locastyle.guidedTour.init(tourAdminClient);
  }

  function statsTour() {
    locastyle.guidedTour.init(tourStats);
  }



  return {
    firstTour: firstTour,
    homeTour: homeTour,
    clientTour: clientTour,
    registerClientTour: registerClientTour,
    adminClientTour: adminClientTour,
    statsTour: statsTour
  };

}());

window.setTimeout(function(){
 var $body = $('body');

  if ($body.hasClass('documentacao_exemplos_painel1_base_index')){
   tourGuiado.firstTour();
  }

  if ($body.hasClass('documentacao_exemplos_painel1_home')){
   tourGuiado.homeTour();
  }

  if ($body.hasClass('documentacao_exemplos_painel1_clients')){
   tourGuiado.clientTour();
  }

  if ($body.hasClass('documentacao_exemplos_painel1_new-client')){
   tourGuiado.registerClientTour();
  }

  if ($body.hasClass('documentacao_exemplos_painel1_client')){
   tourGuiado.adminClientTour();
  }

  if ($body.hasClass('documentacao_exemplos_painel1_stats')){
   tourGuiado.statsTour();
  }





}, 1000)
