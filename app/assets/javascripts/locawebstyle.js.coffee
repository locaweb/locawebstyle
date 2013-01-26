class Locawebstyle
  constructor: ->
    # instanciando
    @collapse = new Collapse()
    @wizard_form = new WizardForm()
    @feature_boxes = new FeatureBoxes()
    # ações que dependem de contexto
    @init($(document))
    # ações que não dependem de contexto
    @clearForm()
    @main()
    @paginatedCarousel()

  init: (container) ->
    @modal(container)
    @inlineForm(container)
    @advancedSearch(container)
    @listDetails(container)
    @datepicker(container)
    @linkToggle(container)
    @defaultForm(container)
    @popover(container)
    @pathWay(container)
    @inputDataValue(container)
    @feature_boxes.init(container)
    @wizard_form.init(container)
    @collapse.init(container)

  inlineForm: (container) ->
    # Encontra os .help-inline e define uma largura se referenciando a largura dos inputs próximos.
    $(".control-group .help-inline, .control-group > .help-inline", container).each (index) ->
      $(this).css "width", $(this).parent().find("input[type=\"text\"], input[type=\"password\"], input[type=\"number\"], input[type=\"email\"], select").width()

  advancedSearch: (container) =>
    # Verifica se os inputs dentro da busca avançada estão vazios, se não estiverem, a busca avancada fica aberta
    $(".advancedSearch", container).each (index, search) ->
      inputVazio = $(search).find('input[value!=""]').size() + $(search).find("select option:selected").not(":empty").size()
      $(search).parent().find('a[data-toggle="collapse"][data-target]').click() if inputVazio > 0
    # altera o texto quando clicado
    $(".advancedSearch", container).on "click", '.lnkSeta[data-text], .lnkArrow[data-text], [data-toggletext="true"]',(e) ->
      @advancedSearchToggleText this
    # altera o texto no hover
    $(".advancedSearch", container).on "hover", '[data-toggletext="true"][data-toggletexthover="true"]',(e) ->
      @advancedSearchToggleText this

  datepicker: (container) ->
    # Datepicker - JQuery UI
    $(".datepicker", container).datepicker
      showOn: "button"
      dateFormat: "dd/mm/yy"
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
      dayNames: ["Domingo", "Segunda-feira", "Ter&ccedil;a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sabado"]
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
    # adiciona classe ico-calendar nos calendarios do datepicker
    $(".ui-datepicker-trigger", container).addClass("icon-calendar").html ""

  listDetails: (container) ->
    # Insere quebra de linha depois das DDs em ListDetails
    $(".listDetail dd", container).after "<hr class=\"sep\">"

  modal: (container) ->
    # abre modal automaticamente
    $(".modalAutoOpen").modal()
    # Faz a modal animar
    $(".modal", container).addClass "fade"
    # Ativa focus quando termina de abrir o modal
    $(".modal", container).on "shown", ->
      $(".autoFocus", this).focus()

  linkToggle: (container) ->
    _this = this
    $(".lnkToggle", container).click (e) ->
      e.preventDefault()
      _this.linkToggleAction(this)

  linkToggleAction: (target) ->
    $(target).parents(".toggleChild").find(".itemToToggle").toggleClass "dNone"
    $(target).parents(".toggleChild").toggleClass $(".toggleChild").attr("data-class")
    if $(target).hasClass('btn')
      input = $(target).parents(".toggleChild").find('[data-value]')
      input.val input.data('value')

  defaultForm: (container) ->
    # Faz o usuário só usar números em vez de letras.
    $(".numbersOnly", container).keyup ->
      @value = @value.replace(/[^0-9\.]/g, "")
    $('input[disabled], select[disabled], textarea[disabled], input[readonly], select[readonly], textarea[readonly]', container).addClass('disabled')
    # Desabilita click em botoes com a classe disabled
    $(".btn.disabled", container).click (e) ->
      e.preventDefault()

  select2: (container) ->
    # Selects Customizados.
    $(".customSelect", container).select2
      placeholder: $(this).data('placeholder') || "Selecione uma opção"
      formatNoMatches: $(this).data('empty') || "Nenhum resultado encontrado"
      allowClear: false

  popover: (container) ->
    # Faz o popover ser habilitado no HOVER e não no Click.
    $('[rel="popover"]', container).popover(trigger: "hover")

  pathWay: (container) ->
    # Conta quantos elementos tem no PathWay - Passo a Passo e coloca uma classe específica
    $(".pathWay", container).each ->
      howMuchSteps = $("li", $(this)).size()
      $(this).addClass "steps#{howMuchSteps}"

  inputDataValue: (container) ->
    fields = $('input[type="url"], input[type="text"], input[type="password"], input[type="number"], input[type="tel"], input[type="email"]', container)
    fields.each (i) ->
      $(this).attr "data-value", $(this).val()

  # fora do init
  advancedSearchToggleText: (element) ->
    # Faz o texto do link que troca da busca SIMPLES para AVANÇADA
    btnText = $(element).html()
    btnTextAlt = $(element).data("text")
    $(element).html(btnTextAlt).data "text", btnText

  client_form: (content, targetElements, disabledClasses, classToContent) ->
    content ||= ".clientDetails form.edit_account"
    targetElements ||= ".disable_form input, .disable_form textarea"
    disabledClasses ||= "noBorder noBackground noShadow cursorDefault"
    classToContent ||= "editable obsGray noBorder removeAfter"

    $(".clientDetails .dropdown-menu").on "click", "a:first", (e) ->
      e.preventDefault()
      $(content).addClass classToContent
      $(targetElements).each (index) ->
        $(this).removeClass(disabledClasses).attr "disabled", false

    $(".clientDetails .dataClient").on "click", ".cancelEdit", (e) ->
      e.preventDefault()
      $(content).removeClass classToContent
      $(targetElements).each (index) ->
        $(this).addClass(disabledClasses).attr "disabled", true

  clearForm: ->
    # Limpa inputs de formulários. Muito usado na busca avançada.
    $(".clearFormBt").live "click", (e) ->
      e.preventDefault()
      $(this).closest(".boxFiltro").find(".clearForm").not(".in").find(":input").each ->
        switch @type
          when "password", "select-multiple", "select-one", "text", "textarea"
            @value = ""
          when "checkbox"
            @selected = false
          when "radio"
            @checked = false

  paginatedCarousel: ->
    # Contando quantos sliders items tem no carousel do sidebar (home do emailmarketing)
    $(".sideBox .carousel").each ->
      if $(".carouselNav b", this).size() > 0
        $(this).bind "slid", (e) ->
          $(".carouselNav b", this).text $(".active", this).index() + 1
        $(".carouselNav i", this).text $(".carousel-inner .item", this).size()
        $(".carouselNav b", this).text $(".active", this).index() + 1

  main: ->
    # adiciona classe parent nos menus que tem submenu
    $('#menuPrincipal li').has('ul').addClass('parent');
    # As vezes temos problemas de hierarquia e conflitos de CSS. Essa classe ajuda a sanar isso
    $('html').addClass('forceClass')
    # nao sei o que eé nem pra que cerve!
    targetAnchor = window.location.hash.replace("!/", "")
    unless targetAnchor == ""
      $("[data-target=" + targetAnchor + "]").click()
      $("[data-target=" + targetAnchor + "]").parent().addClass "active"
    # Exibe/esconde elementos
    dataClass = $('.toggleChild').data('class')
    $('.toggleChild').addClass(dataClass)

$(document).ready ->
  window.locastyle = new Locawebstyle()
