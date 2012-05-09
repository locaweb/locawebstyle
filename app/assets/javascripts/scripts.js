var Locastyle;

Locastyle = (function() {
  function Locastyle() {}
  // Scripts iniciais que modificam o DOM ou geram outras tarefas
  Locastyle.prototype.init = function(obj) {
    // Setinha nas TABs
    obj.find('.tabs li:first-child').addClass('active');

    // Define um intervalo para o Wizard demorar para rodar sozinho
    obj.find('.modalSlider .carousel').carousel({interval: 1000000});
    obj.find('.modalSlider .modal-footer').find('.btnSalvar').hide();
    obj.find('.modalSlider .modal-footer').parents('.modal').find('.modal-footer .slidePrev').hide();

    // Encontra se há algum formulário com erro de validação, e ativa a tab do slider com erro
    if ( obj.find('.modalSlider .modal-body .control-group').hasClass('error') ) {
      $('.modalSlider .item').removeClass('active');
      var item = $('.modalSlider .error').parents('.item:first');
      item.addClass('active').addClass('next');
      window.locastyle.modal_callback(obj, $('.modalSlider .slidePrev:first'));
      item.removeClass('next');
    }

    // Monitora o botão de next e prev dos sliders/wizards de dentro de uma modal
    obj.find('.modal-footer .slideNext, .modal-footer .slidePrev').live("click", function() {
      $(this).parents('.modal').find('.modal-footer .slidePrev').show();
      window.locastyle.modal_callback(obj, $(this));
    });

    // Faz a modal animar \o/
    obj.find('.modal').addClass('fade');

    // Insere quebra de linha depois das DDs em ListDetails
     obj.find('.listDetail dd').after('<hr class="sep">');

    // Datepicker - JQuery UI
    obj.find('.datepicker').datepicker({
      showOn: "button",
      dateFormat: "dd/mm/yy"
    });

    // Encontra os .help-inline e define uma largura se referenciando a largura dos inputs próximos.
    obj.find('.control-group .help-inline, .control-group > label').each(function(index) {
        $(this).css('width', $(this).parent().find('input[type="text"], input[type="password"], input[type="number"], input[type="email"], select').width())
    });

    obj.find('.ui-datepicker-trigger').addClass('icon-calendar').html('');

    // init of change.collapse.data-api
    obj.find('[data-toggle=show]').filter(':checked').change();

    // Insere uma classe SELECTED para o primeiro Collpase
    obj.find('.collapseGroup summary:first').not('noAutoActive').addClass('active').parent('.details').addClass('active');

    // Verifica se os inputs dentro da busca avançada estão vazios, se não estiverem, a busca avancada fica aberta
    var inputVazio;
    obj.find('.advancedSearch').each(function(index, search){
      inputVazio = $(search).find('input[value!=""]').size() + $(search).find('select option:selected').not(':empty').size();
      if (inputVazio > 0) {
        $(search).parent().find('a[data-toggle="collapse"][data-target]').click();
      }
    });
  };

  Locastyle.prototype.modal_callback = function (obj, element) {
    if (obj.find('.modalSlider .carousel .item:first-child').is('.prev')) {
      element.parents('.modal').find('.modal-footer .slidePrev').hide();
    } else {
      element.parents('.modal').find('.modal-footer .slidePrev').show();
    }

    if (obj.find('.modalSlider .item:last-child').is('.next')) {
      element.parents('.modal').find('.modal-footer .slideNext').hide();
      element.parents('.modal').find('.modal-footer .btnSalvar').show();
    } else {
      element.parents('.modal').find('.modal-footer .slideNext').show();
      element.parents('.modal').find('.modal-footer .btnSalvar').hide();
    }
  };

  return Locastyle;
})();

$(document).ready(function() {
  window.locastyle = new Locastyle();

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

  // Insere a possibilidade de inserir acoes especificas de toggle definidos para os collapses
  $('body').on('change.collapse.data-api', '[data-toggle=hide]', function (e) {
    e.preventDefault();
    var $this, href, target;
    $this = $(this);
    target = $this.data('target');
    $(target).collapse('hide');
  });

  $('body').on('change.collapse.data-api', '[data-toggle=show]', function (e) {
    e.preventDefault();
    var $this, href, target;
    $this = $(this);
    target = $this.data('target');
    $(target).collapse('show');
  });

  // Faz a troca de Classe SELECTED entre os Collpases
  $('.collapseGroup summary').live('click', function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).parent('.details').toggleClass('active');
  });

  $('#menuPrincipal li').has('ul').addClass('parent');

  // Faz o texto do link que troca da busca SIMPLES para AVANÇADA
  $('.lnkSeta[data-text]').live('click', function(e){
    var btnText, btnTextAlt;
    e.preventDefault();
    btnText = $(this).html();
    btnTextAlt = $(this).data('text');
    $(this).html( btnTextAlt ).data('text',btnText);
  });

  // Scripts iniciais que modificam o DOM ou geram outras tarefas
  window.locastyle.init($(document));
});

