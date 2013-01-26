class Notification
  constructor: ->

  init: (container) ->
    # NOTIFICATION: Não exibe o alert de notificação
    alertNotifica = $(".lnkNoShow").attr("data-target")

    $(".lnkNoShow").click (e) ->
      e.preventDefault()
      $(this).parent().remove()
      $.cookie alertNotifica, '1'

    $(alertNotifica).remove() if $.cookie(alertNotifica) == "1"

window.notification = new Notification()
