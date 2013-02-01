class @WizardForm
  constructor: ->

  init: (container) ->
    @nextAndPrev(container)
    @openOnError(container)
    $('.modalSlider .carousel', container).carousel({interval: 1000000});

  # Encontra se há algum formulário com erro de validação, e ativa a tab do slider com erro
  openOnError: (container) ->
    # loop em todos os modais com carousel do container
    _this = this
    $('.modalSlider', container).each (i) ->
      if $('.modal-body .control-group', this).hasClass('error')
        # remove a classe active do passo ativo
        $('.item', this).removeClass('active')
        # encontra o primeiro passo que tem erro e adiciona a classe active
        $('.error', this).parents('.item:first').addClass('active')
        # chama o callback que controla os botões
        _this.callback($('.carousel', this))

  nextAndPrev: (container) ->
    # Monitora o botão de next e prev dos sliders/wizards de dentro de uma modal
    $('.modalSlider .carousel', container).on 'slid', (e) =>
      @callback e.target

  # callback que controla os botões de next, prev, save
  callback: (container) ->
    # se o elemento ativo for o primeiro
    if $(".item:first-child", container).hasClass('active')
      $(container).parents(".modal").find(".modal-footer .slidePrev").hide()
    else
      $(container).parents(".modal").find(".modal-footer .slidePrev").show()

    # se o proximo elemento for o último
    if $(".item:last-child", container).hasClass('active')
      $(container).parents(".modal").find(".modal-footer .slideNext").hide()
      $(container).parents(".modal").find(".modal-footer .btnSalvar").show()
    else
      $(container).parents(".modal").find(".modal-footer .slideNext").show()
      $(container).parents(".modal").find(".modal-footer .btnSalvar").hide()
