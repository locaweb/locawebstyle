$(document).ready(function() {

	$('a, input, select, textarea, h1, h2, h3, h4, h5, h6, p').attr('tabindex','0');
	$('#menuPrincipal li > a').attr('tabindex','1');
	$('.pathWay li > a, .btn-primary').attr('tabindex','2');
	$('.btn-primary').attr('tabindex','3');
	$('.tabs li a').attr('tabindex','4');

	$('.alert').focus();

//
// WAI-ARIA nos elementos
//

	//
	// Menu
	$('#menuPrincipal').attr('role','navigation');
	$('#menuPrincipal li a').attr('role','menuitem');

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


	//
	// Elementos Geral
	$('.pathWays').attr('role','navigation');
	$('#rodape').attr('role','contentinfo');
	$('.alert').attr('role','alert');
	$('a.btn').attr('role','button');
	$('.boxGray').attr('role','region');
	$('.boxGray h2').attr('role','presentation');


	// Verifica se existe um elemento mais específico que o MAIN com o conteúdo principal
	if ($('#main > .limite > .breadcrumb + .row > .span12').length == 1) {
		$('#main > .limite > .breadcrumb + .row > .span12').attr('role','main');
	} else {
		$('#main').attr('role','main');
	}
	


});