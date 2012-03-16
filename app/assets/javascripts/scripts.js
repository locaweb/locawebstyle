$(document).ready(function(){

  /** Insere classes de last e first **/
	$('div:last-child, .row:last-child, ul li:last-child').addClass('last-child');
	$('div:first-child, .row:first-child, ul li:first-child').addClass('first-child');
  
  /** insere a classe SPAN nos divs da Grid **/
  $('div[class*="span"]').addClass('span');
  

  // Insere uma classe SELECTED para o primeiro Collpase
  $('.collapseGroup summary:first').addClass('active').parent('.details').addClass('active');


  // Faz a troca de Classe SELECTED entre os Collpases
  $('.collapseGroup summary').click(function(){
    $(this).toggleClass('active');
    $(this).parent('.details').toggleClass('active');
  });

  // Setinha na TAB
  $('.tabs li a').append('<span class="setaTab" />');
  $('.tabs li:first-child').addClass('active');

  /** Faz a modal animar **/
  $('.modal').hide().addClass('fade');

  /** Adiciona uma classe aos elementos logo após uma tabela **/ 
  $('table ~ .navView').addClass('afterTable');

});