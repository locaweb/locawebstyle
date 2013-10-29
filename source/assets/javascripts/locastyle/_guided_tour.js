Locastyle.prototype.guidedTour = (function() {
	'use strict';

	var jsonTour, 
		openTour = false;

	var config = {
		selectors : {
			open:  '.lnk-suggestions',
			init:  '.btn-tour',
			close: '.btn-close',
			tour:  '.guided-tour'
		}
	}

	function init(jsonSteps){
		checkTour(jsonSteps);
		keyCode();
		setCookie();
	}

	function checkTour(jsonSteps){
		if(jsonSteps && hopscotch){
			if( jsonSteps.selectors ){
				$.each( config.selectors, function(key,selector){
					jsonSteps.selectors[key] = jsonSteps.selectors[key] || config.selectors[key];
				});
			}
			setTour(jsonSteps);
		}
	}

	function setTour(tour){
		jsonTour = tour;
		$(config.selectors.open).on({click: openWelcomeTour});
		$(config.selectors.init).on({click: initTour});
		$(config.selectors.close).on({click: closeWelcomeTour});
	}

	function initTour(){
		hopscotch.endTour();
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
		$(config.selectors.tour).toggleClass('on');
		$(config.selectors.init).focus().attr('tabindex', '-1');
	}

	function closeWelcomeTour(){
		$(config.selectors.tour).removeClass('on');
		openTour = false;
	}

	function userAborted(xhr) {
		return !xhr.getAllResponseHeaders();
	}

	function setCookie(){
		if($.cookie("cookie_tour") != "true"){
			$(config.selectors.open).click();
			$.cookie('cookie_tour', "true");
		}
	}

	return {
		init: init,
		openWelcomeTour: openWelcomeTour,
		closeWelcomeTour: closeWelcomeTour
	};

}());
