class @Collapse

  constructor: ->

  init: (container) ->
    @activeParent(container) # Insere classe ACTIVE para parents de Collapse
    @openOnError(container) # abre se tiver um erro
    @default(container)

  default: (container) ->
    # init of change.collapse.data-api
    $("[data-toggle=show]", container).filter(":checked").change()
    # Insere uma classe ACTIVE para o primeiro Collpase
    $(".collapseGroup summary:first", container).not("noAutoActive").addClass("active").parent(".details").addClass "active"
    # previne ação no click que inicia o toggle
    $('[data-toggle="collapse"]').click (e) ->
      e.preventDefault()
    # TODO: pra que isso? quem usa e por que?
    # Insere a possibilidade de inserir acoes especificas de toggle definidos para os collapses
    $(container).on "change.collapse.data-api", "[data-toggle=hide]", (e) ->
      e.preventDefault()
      $($(this).data("target")).collapse "hide"
    $(container).on "change.collapse.data-api", "[data-toggle=show]", (e) ->
      e.preventDefault()
      $($(this).data("target")).collapse "show"

  openOnError: (container) ->
    # Se houver uma classe ERROR dentro de um collapse, ele já aparece aberto.
    $(".collapse .error", container).parents(".collapse").collapse "show"

  activeParent: (container) ->
    #
    # boxCollapse são aqueles collapses como na página de CONFIGURAÇÃO do Email Marketing
    # collpaseGroup fazem parte dos collapses utilizados na home, como em Gateway.
    #
    # quando o collapse disparar o evento show (quando for começar a abrir) adiciona a classe active
    $(".collapse", container).on "show", ->
      $(this).parents(".boxCollapse, .details").addClass "active"
    # quando o collapse disparar o evento hiden (quando for começar a fechar) remove a classe active
    $(".collapse", container).on "hide", ->
      $(this).parents(".boxCollapse, .details").removeClass "active"
