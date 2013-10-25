Locastyle.prototype.guidedTour = (function() {
	'use strict';

	var jsonTour, 
		openTour = false;

	function init(jsonSteps){
		checkTour(jsonSteps);
		keyCode();
		setCookie();
	}

	function checkTour(jsonSteps){
		if(jsonSteps && hopscotch){
			setTour(jsonSteps);
		}
	}

	function setTour(tour){
		jsonTour = tour;
		$('.lnk-suggestions').on({click: openWelcomeTour});
		$('.guided-tour .btn-tour').on({click: initTour});
		$('.guided-tour .btn-close').on({click: closeWelcomeTour});
	}

	function initTour(){
		hopscotch.startTour(jsonTour);
		keyCode();
		closeWelcomeTour();
	}

	function keyCode(element){
		var left = 39;
		var right = 37;
		var esc = 27;
		document.onkeyup = function(e){
			if(openTour){
				var key = event.keyCode
				if(key == left ){	hopscotch.nextStep(); }
				if(key == right){	hopscotch.prevStep(); }
				if(key == esc  ){	hopscotch.endTour();  }
			}
		}
	}

	function openWelcomeTour(){
		openTour = true;
		$('.guided-tour').toggleClass('on');
		$('.btn-tour').focus().attr('tabindex', '-1');
	}

	function closeWelcomeTour(){
		$('.guided-tour').removeClass('on');
		openTour = false;
	}

	function userAborted(xhr) {
		return !xhr.getAllResponseHeaders();
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
		closeWelcomeTour: closeWelcomeTour
	};

}());
