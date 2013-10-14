Locastyle.prototype.guidedTour = (function() {
	'use strict';

	function init(jsonSteps){
		checkTour(jsonSteps);
		keyCode();
		setCookie();
	}

	var jsonTour;

	function setTour(tour){
		jsonTour = tour;
		$('.lnk-suggestions').on({click: openWelcomeTour});
		$('.guided-tour .btn-tour').on({click: initTour});
		$('.guided-tour .btn-close').on({click: closeWelcomeTour});
	}

	function openWelcomeTour(){
		$('.guided-tour').toggleClass('on');
		$('.btn-tour').focus().attr('tabindex', '-1');
		return false;
	}

	function closeWelcomeTour(){
		$('.guided-tour').removeClass('on');
	}

	function initTour(){
		hopscotch.startTour(jsonTour);
		keyCode();
		closeWelcomeTour();
		return false;
	}

	function keyCode(element){
		var left = 39;
		var right = 37;
		var esc = 27;
		document.onkeyup = function(e){
			var key = event.keyCode
			if(key == left ){	hopscotch.nextStep(); }
			if(key == right){	hopscotch.prevStep(); }
			if(key == esc  ){	hopscotch.endTour();  }
		}
	}

	function userAborted(xhr) {
		return !xhr.getAllResponseHeaders();
	}

	function checkTour(jsonSteps){
		if(jsonSteps && hopscotch){
			setTour(jsonSteps);
		}
	}

	function btnPtBr(){
		tourLocales = {
			nextBtn: "Próximo",
			prevBtn: "Anterior",
			doneBtn: "Ok",
			skipBtn: "Sair",
			closeTooltip: "Fechar"
		};
	}

	function setCookie(){
		if($.cookie("cookie_tour") != "true"){
			$('.lnk-suggestions').click();
			$.cookie('cookie_tour', "true");
		}
	}

	return {
		init: init,
		openWelcomeTour: openWelcomeTour,
		closeWelcomeTour: closeWelcomeTour,
		btnPtBr: btnPtBr
	};

}());
