$(function(){

 	// Chama função de criação de menu acessível.
	accessMenu();

	// $('select, textarea, h1, h2, h3, h4, h5, h6, p').attr('tabindex','0');
	// $('input, select, .pathWay li.active > a, .btn-primary, .alert a').attr('tabindex','2');
	// $('.btn-primary').attr('tabindex','3');
	// $('.tabs li a').attr('tabindex','4');
	//$('#menuPrincipal li > a, #main .chamadasBox h3 a, .headerContent h1, .alert').attr('tabindex','2');
	$('#menuPrincipal li > a').attr('tabindex','2');
	$('.btn, .tabs a, .sidebar h1, .sidebar h2').attr('tabindex','4');
	//$('input, select, .btn.btn-primary').attr('tabindex','2');

//
// WAI-ARIA nos elementos
//

	//
	// Menu
	$('#menuPrincipal').attr('role','navigation');
	$('#menuPrincipal li a').attr('role','menuitem');

	//
	// Elementos Geral
	// $('.pathWays').attr('role','navigation');
	$('#rodape').attr('role','contentinfo');
	$('.alert').attr('role','alert');
	$('a.btn').attr('role','button');
	$('.boxGray').attr('role','region');
	$('.boxGray h2').attr('role','presentation');
	$('.headerPrincipal').attr('role','banner');
	$('.content').attr('role','main'); // criar essa classe nos produtos ??
	$('.sidebar').attr('role','complementary');

	//
	// TABS
	$('.tabs').attr('role','tablist');

	// Inserie ARIA-SELECTED em TABS ativas

	// $('.tab-pane').attr({
	// 	role: 'tabpanel',
	// 	'aria-hidden': 'true'
	// });

	// $('[data-toggle="tab"]').attr('aria-selected','false');
	// $('.active [data-toggle="tab"]').attr('aria-selected','true');
	// $('[data-toggle="tab"]').attr('role','tab').on('show', function(e){
	// 	$(e.target).attr('aria-selected','true');
	// 	$(e.relatedTarget).attr('aria-selected','false');
	// });

	// Verifica se existe um elemento mais específico que o MAIN com o conteúdo principal
	// if ($('#main .limite .row .span12').length == 1) {
	// 	$('#main .limite .row .span12').attr('role','main');
	// } else {
	// 	$('#main').attr('role','main');
	// }

})

function accessMenu(){
	// Colocando o menu acessível logo depois do Logo. Assim o logo é lido primeiro.
	$('.serviceName').after('<nav class="menuAccess" />');
	$('[data-access]').each(function(){
		var title = $(this).attr('title');
		var  href = $(this).attr('href');
		var  text = $(this).text();
		$('.menuAccess').append('<a tabindex="1" href="'  + href + '" aria-label="' + title + '" title="' + title + '">' + text + '</a>');
	})      
}
