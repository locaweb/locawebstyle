class @FeatureBoxes
  constructor: ->

  init: (container) ->
    @activeLink(container)
    @actionLink(container)
    @toggleBox('.minShortcuts', false) if $.cookie("minShortcuts") == '1'

  activeLink: (container) ->
    # Faz o click acontecer em toda div e não só no h3
    $(".chamadasBox div", container).each ->
      title = $(this).find("p").text()
      $(this).append $(this).find("h3 a").clone().addClass("lnkCoverAll").attr("title", title).attr("aria-label", title)

  actionLink: (container) ->
    $(container).on "click", ".minShortcuts",(e) =>
      e.preventDefault()
      @toggleBox(e.target)

  toggleBox: (element, toChange=true) ->
    $(".expandBox").toggleClass "microBox"
    switch $.cookie("minShortcuts")
      when '0', null
        $.cookie "minShortcuts", '1' if toChange
        @toggleText(element)
      else
        $.cookie "minShortcuts", '0' if toChange
        @toggleText(element)

  toggleText: (element) ->
    text = $(element).html()
    data = $(element).data("text")
    $(element).text(data).data "text", text
