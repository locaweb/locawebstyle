window.tourGuiado = {};

tourGuiado = (function() {
  'use strict';

  // settings and steps for tour
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
        xOffset: -30,
      },
      {
        target: '.ls-user-account',
        title: 'Sua conta',
        content: 'Detalhes de seu login Locaweb.',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: -50,

      },
      {
        target: '.ls-alerts-list',
        title: 'Ficou com dúvidas?',
        content: 'Acesse nossos canais de ajuda.',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: -50,
      },
      {
        target: '.ls-alerts-list',
        title: 'Ajude a melhorar o painel',
        content: 'Fique à vontade para enviar sugestões e comentários.',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: -90,
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
        target: '.ls-user-account',
        title: 'Sua conta',
        content: 'Detalhes de seu login Locaweb.1',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: -50,
      },
      {
        target: '.ls-alerts-list',
        title: 'Ficou com dúvidas?',
        content: 'Acesse nossos canais de ajuda.',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: -50,
      },
      {
        target: '.ls-alerts-list',
        title: 'Ajude a melhorar o painel',
        content: 'Fique à vontade para enviar sugestões e comentários.',
        placement: 'bottom',
        arrowOffset: 'center',
        xOffset: -90,
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
        target: '.ls-custom-select-one:nth-child(1)',
        title: 'Filtro por status',
        content: 'Busque um cliente por status.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-box-filter form:nth-child(2) input',
        title: 'Busca por nome',
        content: 'Procure um cliente por nome.',
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
        target: '.ls-form legend',
        title: 'Informações do seu cliente',
        content: 'Preencha os dados do seu cliente e defina uma senha para ele acessar o painel.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-box-gray .row .ls-label:nth-child(2)',
        title: 'Quantidade de envios',
        content: 'Defina a quantidade de envios que seu cliente poderá utilizar.',
        placement: 'top',
        arrowOffset: 'center'
      },
      {
        target: '.ls-box-gray .ls-label:nth-child(3)',
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
        content: 'Tenha acesso ao painel do cliente.',
        placement: 'left',
        arrowOffset: 'center',
        yOffset: -80,
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
        xOffset: 40,
        yOffset: -60,
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
        placement: 'right',
        arrowOffset: 'center',
        xOffset: -500,
        yOffset: -60
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

  var tourConfigDomain = {
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
        target: '.col-md-6:nth-child(1) .ls-title-2',
        title: 'Domínio dos links',
        content: 'Personalize o padrão do domínio dos links das mensagens que seus clientes enviam.',
        placement: 'top',
        arrowOffset: 'center',
      },
      {
        target: '.col-md-6:nth-child(2) .ls-title-2',
        title: 'Domínio de acesso',
        content: 'Personalize o domínio que seu cliente acessa o painel da sua revenda.',
        placement: 'top',
        arrowOffset: 'center',
      }
    ]
  };


  var tourConfigEmail = {
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
        target: '.ls-form',
        title: 'E-mail de remetente da sua revenda',
        content: 'Configure o e-mail que seus clientes receberão.',
        placement: 'top',
        arrowOffset: 'center',
      }
    ]
  };


  var tourConfigAspect = {
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
        target: '.ls-main img',
        title: 'Exemplo do painel de seus clientes',
        content: 'Veja como fica o painel da sua revenda para seus clientes.',
        placement: 'top',
        arrowOffset: 'center',
        xOffset: -50
      },
      {
        target: '.ls-main .ls-box .ls-label',
        title: 'Personalize o nome da revenda ',
        content: 'Deixe o nome da revenda com o nome da sua empresa.',
        placement: 'top',
        arrowOffset: 'center',
      },
      {
        target: '.ls-main .ls-box:nth-child(2)',
        title: 'Identificação da sua marca',
        content: 'Defina como será exibido o cabeçalho do painel e dos e-mails que seus clientes recebem da sua revenda.',
        placement: 'top',
        arrowOffset: 'center',
      },
      {
        target: '.ls-main .col-md-9 > .ls-box:nth-child(3)',
        title: 'Personalize a cor',
        content: 'Escolha a cor do painel que combine com sua empresa.',
        placement: 'top',
        arrowOffset: 'center',
      }
    ]
  };

  var tourConfigAnswer = {
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
        target: '.ls-main .col-md-6:nth-child(1) .ls-form',
        title: 'Ofereça suporte por telefone',
        content: 'Preencha o número que será exibido no rodapé do painel do seu cliente.',
        placement: 'top',
        arrowOffset: 'center',
      },
      {
        target: '.ls-main .col-md-6:nth-child(2) .ls-form',
        title: 'Ofereça suporte por um sistema de chamados',
        content: 'Preencha o endereço da sua conta Webdesk. O link será exibido no rodapé do painel do seu cliente.',
        placement: 'top',
        arrowOffset: 'center',
      }
    ]
  };

  var tourConfigApi = {
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
        target: '.ls-box',
        title: 'Integre com outros sistemas',
        content: 'Utilize os dados para autenticar suas chamadas na API.',
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

  function configDomainTour() {
    locastyle.guidedTour.init(tourConfigDomain);
  }

  function configEmailTour() {
    locastyle.guidedTour.init(tourConfigEmail);
  }

  function configAspectTour() {
    locastyle.guidedTour.init(tourConfigAspect);
  }

  function configAnswerTour() {
    locastyle.guidedTour.init(tourConfigAnswer);
  }

  function configApiTour() {
    locastyle.guidedTour.init(tourConfigApi);
  }


  return {
    firstTour: firstTour,
    homeTour: homeTour,
    clientTour: clientTour,
    registerClientTour: registerClientTour,
    adminClientTour: adminClientTour,
    statsTour: statsTour,
    configDomainTour: configDomainTour,
    configEmailTour: configEmailTour,
    configAspectTour: configAspectTour,
    configAnswerTour: configAnswerTour,
    configApiTour: configApiTour
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

  if ($body.hasClass('documentacao_exemplos_painel1_config-domain')){
   tourGuiado.configDomainTour();
  }

  if ($body.hasClass('documentacao_exemplos_painel1_config-email')){
   tourGuiado.configEmailTour();
  }

  if ($body.hasClass('documentacao_exemplos_painel1_config-aspect')){
   tourGuiado.configAspectTour();
  }

  if ($body.hasClass('documentacao_exemplos_painel1_config-answer')){
   tourGuiado.configAnswerTour();
  }

  if ($body.hasClass('documentacao_exemplos_painel1_config-api')){
   tourGuiado.configApiTour();
  }

}, 1000)
