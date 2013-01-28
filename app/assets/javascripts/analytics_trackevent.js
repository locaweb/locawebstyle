
  //
  // TRACK EVENT ANALYTICS
  // $('.serviceName a').attr('onclick', "_gaq.push(['_trackEvent(category, action, opt_label, opt_value, opt_noninteraction)]);");
  $('.serviceName a').attr('onclick', "_gaq.push(['_trackEvent', 'Logo', 'Clique', 'Nome do Servico']);"); // Logo do produto
  $('.logOut').attr('onclick', "_gaq.push(['_trackEvent', 'BT_Sair', 'Clique', 'Sair do Servico']);"); // Botão sair
  $('.lnkSugestoes').attr('onclick', "_gaq.push(['_trackEvent', 'BT_Sugestoes', 'Clique', 'Sugestoes Feedbackr']);"); // Link de sugestões
  $('.infoLogin .btn-group').attr('onclick', "_gaq.push(['_trackEvent', 'Combo_Administrar', 'Clique', 'Troca de Ambiente']);"); // Combo de mudança de ambiente

  $('.minShortcuts.shortcutExpanded').attr('onclick', "_gaq.push(['_trackEvent', 'Atalhos', 'Clique', 'Minimizar']);"); // links minimizar atalhos
  $('.minShortcuts').attr('onclick', "_gaq.push(['_trackEvent', 'Atalhos', 'Clique', 'Expandir']);"); // links expandir atalhos

  $('.span12 .carousel-control.left').attr('onclick', "_gaq.push(['_trackEvent', 'Slider', 'Clique', 'Anterior']);"); // seta dica esquerda HOME
  $('.span12 .carousel-control.right').attr('onclick', "_gaq.push(['_trackEvent', 'Slider', 'Clique', 'Proximo']);"); // seta dica direita HOME
 
  $('.innerSideBox .carousel-control.left').attr('onclick', "_gaq.push(['_trackEvent', 'Slider', 'Clique', 'Anterior']);"); // seta dica esquerda
  $('.innerSideBox .carousel-control.right').attr('onclick', "_gaq.push(['_trackEvent', 'Slider', 'Clique', 'Proximo']);"); // seta dica direita

  $('.footerTop .ico-helpDesk').attr('onclick', "_gaq.push(['_trackEvent', 'Atendimento', 'Clique', 'Helpdesk']);"); // link Help Desk do Footer
  $('.footerTop .ico-Chat').attr('onclick', "_gaq.push(['_trackEvent', 'Atendimento', 'Clique', 'Chat']);"); // link Chat do Footer
  $('.footerTop .ico-Telefone').attr('onclick', "_gaq.push(['_trackEvent', 'Atendimento', 'Clique', 'Telefone']);"); // link Telefone do Footer
  $('.footerTop .lnkSeta.lnkSetaWhite').attr('onclick', "_gaq.push(['_trackEvent', 'Atendimento', 'Clique', 'VerFormasAtendimento']);"); // Link Ver Outras Formas

