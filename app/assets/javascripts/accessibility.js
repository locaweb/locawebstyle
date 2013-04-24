$(function(){

	accessMenu();
	subMenuAccess();

	// $('select, textarea, h1, h2, h3, h4, h5, h6, p').attr('tabindex','0');
	// $('input, select, .pathWay li.active > a, .btn-primary, .alert a').attr('tabindex','2');
	// $('.btn-primary').attr('tabindex','3');
	// $('.tabs li a').attr('tabindex','4');
	//$('#menuPrincipal li > a, #main .shortcutBox h3 a, .headerContent h1, .alert').attr('tabindex','2');
	$('#menuPrincipal li > a').attr('tabindex','2');
	$('.btn, .tabs a').attr('tabindex','3');
	//$('input, select, .btn.btn-primary').attr('tabindex','2');

//
// WAI-ARIA nos elementos
//

	//
	// Menu
	$('#menuPrincipal').attr('role','navigation');
	$('#menuPrincipal li a').attr('role','menuitem');
	$('#menuPrincipal li > a').attr('tabindex','2');


	//
	// Elementos Geral
	$('.pathWays').attr('role','navigation');
	$('#rodape').attr('role','contentinfo');
	$('.alert').attr('role','alert');
	$('a.btn, .modal-header .close').attr('role','button');
	$('.boxGray').attr('role','region');
	$('.boxGray h2').attr('role','presentation');
	$('.headerPrincipal').attr('role','banner');
	$('.content').attr('role','main'); // criar essa classe nos produtos ??
	$('.sidebar').attr('role','complementary');
	$('input.required').attr('aria-required','true');
	$('.lnkCoverAll').attr('tabindex','3');
	//$('.shortcutBox h3 > a').attr('aria-hidden','true');

	$('.lnkCoverAll .btn').attr('tabindex','0');


	//
	// TABS
	$('.tabs').attr('role','tablist');

	// Inserie ARIA-SELECTED em TABS ativas
	$('.tabs li a').attr({
		role: 'tab',
		'aria-selected': 'false',
		tabindex : 3
	});

	$('.tabs li.active a').attr('aria-selected','true');
	$('.tabs li.active a').attr('tabindex','3');

	//collapse
	$('.boxCollapse header').each(function(){
		var title = $(this).find('h4').text();
		var target = $(this).data('target');
		$(this).prepend('<a href="#" role="button" aria-haspopup="true" aria-controls="'+target+'" aria-label="'+title+'" title="'+title+'" class="lnkCollapse" tabindex="3"></a>');
	})
	$('.collapse').find('[tabindex="3"]').attr('tabindex','0');
	$('.collapse.in').find('[tabindex="0"]').attr('tabindex','3');

	//Notificaçao
	$('.flash_alert, .focusOn, .modal').attr('tabindex','-1').focus();

	//Ir para o conteudo
	$('.lnkContent').on('click',function(e){
		e.preventDefault();
    $('.titleContent').attr('tabindex', '-1').focus().css('outline','none');
    $('html, body').animate({
		    scrollTop: $(".titleContent").offset().top
		}, 500);
  })
  $('.accessibility a').focus(function(){
  	$(this).parent().addClass('show');
  }).blur(function(){
  	$(this).parent().removeClass('show');
  })

  // Selecao de servicos no header
  $('.dropdown-menu li:last-child a').blur(function(){
  	$(this).parents('.dropdown-menu').siblings('.dropdown-toggle').click();
  	$('.serviceName a').focus();
  })

  // Insere link sobre as chamadas
  // $('.shortcutBox > div').each(function(){
  //   var title = $(this).find('p').text()
  //   $(this).append( $(this).find('h3 a').clone().addClass('lnkCoverAll').attr('title',title).attr('aria-label',title).attr('tabindex', '3') );
  // })

  // Ativa visualmente as chamadas ao receber o foco do teclado
  $('.shortcutBox a').focus(function(){
  	$(this).parents('div:first').addClass('active');
  }).blur(function(){
  	$('.shortcutBox > div').removeClass('active')
  })

  // Ativa visualmente as chamadas ao receber o foco do teclado
  $('.lnkCollapse').focus(function(){
  	$(this).parents('.boxCollapse').addClass('focus');
  }).blur(function(){
  	$(this).parents('.boxCollapse').removeClass('focus');
  })

  // Menu com focus
  $('#menuPrincipal > ul > li > a').focus(function(){
  	$(this).parents('li').addClass('selected');
  }).blur(function(){
  	$(this).parents('li').removeClass('selected');
  })


  


})

function accessMenu(){
	// Colocando o menu acessível logo depois do Logo. Assim o logo é lido primeiro.
	$('.serviceName').after('<nav class="menuAccess" />');
	$('[data-access]').each(function(){
		var title = $(this).attr('title');
		var  href = $(this).attr('href');
		var  text = $(this).text();
		$('.menuAccess').append('<a role="menuitem" tabindex="1" href="'  + href + '" aria-label="' + title + '" title="' + title + '">' + text + '</a>');
	})
}

// Deixa o submenu acessivel
function subMenuAccess(){
	$('#menuPrincipal .parent a').focus(function(){
	$(this).parents('.parent').addClass('focus');
	$(this).parents('.parent').find('ul').attr({
		'aria-expanded' : true,
			 'aria-hidden': false
		})
	}).blur(function(){
		$(this).parents('.parent').removeClass('focus');
		$(this).parents('.parent').find('ul').attr({
			'aria-expanded' : false,
				 'aria-hidden': true
		})
	})
}
