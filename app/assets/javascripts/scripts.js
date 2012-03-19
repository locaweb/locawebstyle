$(document).ready(function(){

  // insere a classe SPAN nos divs da Grid
  $('div[class*="span"]').addClass('span');
  
  $('label').addClass('control-label');

  // Insere uma classe SELECTED para o primeiro Collpase
  $('.collapseGroup summary:first').addClass('active').parent('.details').addClass('active');


  // Faz a troca de Classe SELECTED entre os Collpases
  $('.collapseGroup summary').click(function(){
    $(this).toggleClass('active');
    $(this).parent('.details').toggleClass('active');
  });

  // Datepicker - JQuery UI
  $('.datepicker').datepicker({
    showOn: "button",
    dateFormat: "dd/mm/yy"
  });
 $('.ui-datepicker-trigger').addClass('icon-calendar').html('').wrap('<span class="add-on">');

  // Faz o texto do link que troca da busca SIMPLES para AVANÇADA
  var btnBuscaAvancadaText = $('a.lnkSeta[data-text]').html();
  var btnBuscaAvancadaTextAlt = $('a.lnkSeta[data-text]').attr('data-text');

  $('.boxFiltro a.lnkSeta[data-target]').click(function(){
    if ( $(this).html() == btnBuscaAvancadaText  ){
      $(this).html(btnBuscaAvancadaTextAlt);
    } else {
      $(this).html( btnBuscaAvancadaText );
    }
  });

 if ($('#optBuscaAvancada fieldset input').val('') ){
    $(this).html(btnBuscaAvancadaTextAlt);
  } else {
    $(this).html( btnBuscaAvancadaText );
  }


  
  // Setinha nas TABs
  $('.tabs li a').append('<span class="setaTab" />');
  $('.tabs li:first-child').addClass('active');

  // Faz a modal animar \o/
  $('.modal').hide().addClass('fade');

  // Adiciona uma classe aos elementos logo após uma tabela
  $('table ~ .navView').addClass('afterTable');

});