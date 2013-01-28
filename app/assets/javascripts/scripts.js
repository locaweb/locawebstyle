var Locastyle;

Locastyle = (function() {
  function Locastyle() {}

  // Scripts iniciais que modificam o DOM ou geram outras tarefas
  Locastyle.prototype.init = function(obj) {
    window.locastyle.linkToggle();
    window.locastyle.inputDataValue();
    // Define um intervalo para o Wizard demorar para rodar sozinho
    $('.modalSlider .carousel', obj).carousel({interval: 1000000});
    $('.modalSlider .modal-footer', obj).find('.btnSalvar').hide();
    $('.modalSlider .modal-footer', obj).parents('.modal').find('.modal-footer .slidePrev').hide();

    // Encontra se há algum formulário com erro de validação, e ativa a tab do slider com erro
    if ( $('.modalSlider .modal-body .control-group', obj).hasClass('error') ) {
      $('.modalSlider .item').removeClass('active');
      var item = $('.modalSlider .error').parents('.item:first');
      item.addClass('active').addClass('next');
      window.locastyle.modal_callback(obj, $('.modalSlider .slidePrev:first'));
      item.removeClass('next');
    }

    // Monitora o botão de next e prev dos sliders/wizards de dentro de uma modal
    $('.modal-footer .slideNext, .modal-footer .slidePrev', obj).live("click", function() {
      $(this).parents('.modal').find('.modal-footer .slidePrev').show();
      window.locastyle.modal_callback(obj, $(this));
    });

    // Faz a modal animar \o/
    $('.modal', obj).addClass('fade');

    // Ativa focus quando termina de abrir o modal
    $('.modal', obj).on('shown', function () {
      $('.autoFocus', this).focus();
    });

    // Conta quantos elementos tem no PathWay - Passo a Passo e coloca uma classe específica
    var howMuchSteps = $('.pathWay li').size();
    $('.pathWay').each(function(){ $(this).addClass('steps' + howMuchSteps) })

    // Insere quebra de linha depois das DDs em ListDetails
     $('.listDetail dd', obj).after('<hr class="sep">');

    // Datepicker - JQuery UI
    $('.datepicker', obj).datepicker({
      showOn: "button",
      dateFormat: "dd/mm/yy",
      monthNamesShort: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
      monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
      dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
      dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
      dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
    });

    // Encontra os .help-inline e define uma largura se referenciando a largura dos inputs próximos.
    $('.control-group .help-inline, .control-group > .help-inline', obj).each(function(index) {
      $(this).css('width', $(this).parent().find('input[type="text"], input[type="password"], input[type="number"], input[type="email"], select').width())
    });

    $('.ui-datepicker-trigger', obj).addClass('icon-calendar').html('');

    // init of change.collapse.data-api
    $('[data-toggle=show]', obj).filter(':checked').change();

    // Insere uma classe ACTIVE para o primeiro Collpase
    $('.collapseGroup summary:first', obj).not('noAutoActive').addClass('active').parent('.details').addClass('active');

    // Verifica se os inputs dentro da busca avançada estão vazios, se não estiverem, a busca avancada fica aberta
    var inputVazio;
    $('.advancedSearch', obj).each(function(index, search){
      inputVazio = $(search).find('input[value!=""]').size() + $(search).find('select option:selected').not(':empty').size();
      if (inputVazio > 0) {
        $(search).parent().find('a[data-toggle="collapse"][data-target]').click();
      }
    });

  };

  Locastyle.prototype.client_form = function(content, targetElements, disabledClasses, classToContent){
    content || (content = ".clientDetails form.edit_account");
    targetElements || (targetElements = ".disable_form input, .disable_form textarea");
    disabledClasses || (disabledClasses = "noBorder noBackground noShadow cursorDefault");
    classToContent || (classToContent = "editable obsGray noBorder removeAfter");
    $(".clientDetails .dropdown-menu").on('click', 'a:first', function(e) {
      e.preventDefault();
      $(content).addClass(classToContent);
      return $(targetElements).each(function(index) {
        return $(this).removeClass(disabledClasses).attr("disabled", false);
      });
    });
    return $(".clientDetails .dataClient").on('click', '.cancelEdit', function(e) {
      e.preventDefault();
      $(content).removeClass(classToContent);
      return $(targetElements).each(function(index) {
        return $(this).addClass(disabledClasses).attr("disabled", true);
      });
    });
  }

  Locastyle.prototype.modal_callback = function (obj, element){
    if(navigator.userAgent.match(/msie/i) != null){
      window.classAgentPrev = '.active';
      window.classAgentNext = '.active';
    }else{
      window.classAgentPrev = '.prev';
      window.classAgentNext = '.next';
    }
    if ($('.modalSlider .carousel .item:first-child', obj).is(classAgentPrev)){
      element.parents('.modal').find('.modal-footer .slidePrev').hide();
    } else {
      element.parents('.modal').find('.modal-footer .slidePrev').show();
    }

    if ($('.modalSlider .item:last-child', obj).is(classAgentNext)){
      element.parents('.modal').find('.modal-footer .slideNext').hide();
      element.parents('.modal').find('.modal-footer .btnSalvar').show();
    } else {
      element.parents('.modal').find('.modal-footer .slideNext').show();
      element.parents('.modal').find('.modal-footer .btnSalvar').hide();
    }
  };

  Locastyle.prototype.linkToggle = function(){
    $('.lnkToggle').on('click',function(e){
      e.preventDefault();
      var itemClass = $('.toggleChild').attr('data-class');
      $(this).parents('.toggleChild').find('.itemToToggle').toggleClass("dNone");
      $(this).parents('.toggleChild').toggleClass(itemClass);
      window.locastyle.changeDataValue(this);
      $(this).trigger($.Event('lnkToggleFinish'));
    });
  };

  Locastyle.prototype.changeDataValue = function(target){
    if($(target).hasClass('btn')){
      var inputs = $(target).parents(".toggleChild").find('[data-value]')
      inputs.each(function(){
        $(this).val($(this).data('value'));
      });
        
    }
  }

  Locastyle.prototype.inputDataValue = function(element){
    $.each($('input[type="url"], input[type="text"], input[type="password"], input[type="number"], input[type="tel"], input[type="email"]', element), function(i, field){
      var value = $(this).attr("value");
      $(this).attr("data-value", value);
    });
  }

  return Locastyle;
})();
window.locastyle = new Locastyle();
$(document).ready(function() {

  // Contando quantos sliders items tem no slider das sidebares
  $.each($('.sideBox .carousel'), function() {
    if ($('.carouselNav b', this).size() > 0) {
      $(this).bind('slid', function (e) {
        $('.carouselNav b', this).html($('.active', this).index() + 1);
      });
      $('.carouselNav i', this).html($('.carousel-inner .item', this).size())
      $('.carouselNav b', this).html($('.active', this).index() + 1);
    }
  });

  $(".modalAutoOpen").modal();

  // Limpa inputs de formulários. Muito usado na busca avançada.
  $('.clearFormBt').live('click', function(e){
    e.preventDefault();
    $(this).closest('.boxFiltro').find('.clearForm').not('.in').find(':input').each(function(){
      switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
                this.selected = false;
                break;
            case 'radio':
                this.checked = false;
        }
    });
  });

  // Faz o usuário só usar números em vez de letras.
  $('.numbersOnly').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g,'');
  });

  // Insere a possibilidade de inserir acoes especificas de toggle definidos para os collapses
  $('body').on('change.collapse.data-api', '[data-toggle=hide]', function (e) {
    e.preventDefault();
    $($(this).data('target')).collapse('hide');
  });

  $('body').on('change.collapse.data-api', '[data-toggle=show]', function (e) {
    e.preventDefault();
    $($(this).data('target')).collapse('show');
  });

  $('[data-toggle="collapse"]').click(function (e){e.preventDefault();});

  $('#menuPrincipal li').has('ul').addClass('parent');

  $('input[disabled], select[disabled], textarea[disabled], input[readonly], select[readonly], textarea[readonly]').addClass('disabled');

  // Faz o texto do link que troca da busca SIMPLES para AVANÇADA
  $('.lnkSeta[data-text], .lnkArrow[data-text], [data-toggletext="true"]').live('click', function(e){
    changeText(this);
  });

  $('[data-toggletext="true"][data-toggletexthover="true"]').live('hover', function(e){
    changeText(this);
  });

  function changeText(element){
    var btnText, btnTextAlt;
    btnText = $(element).html();
    btnTextAlt = $(element).data('text');
    $(element).html(btnTextAlt).data('text',btnText);
  }

  function changeTextChamadas(element){
    var btnText, btnTextAlt;
    btnTextAlt = $(element).html();
    btnText = $(element).data('text');
    $(element).html(btnText).data('text',btnTextAlt);
  }

  // Selects Customizados.
  $(".customSelect").select2({
     placeholder: "Selecione uma opção",
     formatNoMatches: "Nenhum resultado encontrado",
     allowClear: false
  });

  // As vezes temos problemas de hierarquia e conflitos de CSS. Essa classe ajuda a sanar isso
  $('html').addClass('forceClass');

  // Desabilita click em botoes com disabled
  $('.btn.disabled').click(function(event){event.preventDefault();})

  // Faz o popover ser habilitado no HOVER e não no Click.
  $('[rel="popover"]').popover({trigger: 'hover'})


  // Insere classe ACTIVE para parents de Collapse
  //
  // boxCollapse são aqueles collapses como na página de CONFIGURAÇÃO do Email Marketing
  // collpaseGroup fazem parte dos collapses utilizados na home, como em Gateway.
  //
  function boxCollapseActive() {
    $('.collapse').on('show', function(){
      $(this).parents('.boxCollapse, .details').addClass('active');
    });

    $('.collapse').on('hide', function(){
      $(this).parents('.boxCollapse, .details').removeClass('active');
    });
  }

  // Pega todos os collapses e deixa sob a função de adicionar ACTIVE nos parents.
  $('[data-toggle="collapse"]').click( boxCollapseActive() );

  // CHAMADAS: Faz o click acontecer no chamadas
  // $('.chamadasBox div').find('h3 a').clone().addClass('lnkCoverAll').appendTo($(this));
  $('.chamadasBox div').each(function(){
    var title = $(this).find('p').text()
    $(this).append( $(this).find('h3 a').clone().addClass('lnkCoverAll').attr('title',title).attr('aria-label',title) );
  })

  if($.cookie("minShortcuts") == 0 || $.cookie("minShortcuts") == null){
    $(".expandBox").removeClass("microBox");
  }else{
    $(".expandBox").addClass("microBox");
    changeTextChamadas('.minShortcuts[data-text]')
  }

  function toggleBox(){
    if($.cookie("minShortcuts") == 0 || $.cookie("minShortcuts") == null){
      $.cookie("minShortcuts", 1);
      changeTextChamadas('.minShortcuts[data-text]')
    }else{
      $.cookie("minShortcuts", 0);
      changeText('.minShortcuts[data-text]')
    }
  }

  $(".minShortcuts").live('click', function(e){
    toggleBox()
    $(".expandBox").toggleClass("microBox");
    $(this).toggleClass("shortcutExpanded");
    changeText('.minShortcuts[data-text]')
  });

  // NOTIFICATION: Não exibe o alert de notificação
  var alertNotifica = $('.lnkNoShow').attr('data-target')
  $('.lnkNoShow').click(function(){
    $(this).parent().remove()
    $.cookie( alertNotifica, 1 );
  });

  if($.cookie(alertNotifica) == "1"){
    $(alertNotifica).remove()
  }

  var targetAnchor = window.location.hash.replace("!/", "");
  if(targetAnchor != ''){
    $("[data-target="+targetAnchor+"]").click()
    $("[data-target="+targetAnchor+"]").parent().addClass("active")
  }

  // Se houver uma classe ERROR dentro de um collapse, ele já aparece aberto.
  $('.error').parents('.collapse').collapse('show');

  // Scripts iniciais que modificam o DOM ou geram outras tarefas
  window.locastyle.init($(document));

  //Exibe/esconde elementos
  var dataClass = $('.toggleChild').data('class')
  $('.toggleChild').addClass(dataClass);

});

