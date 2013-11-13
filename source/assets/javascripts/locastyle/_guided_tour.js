Locastyle.prototype.guidedTour = ( function() {
	'use strict';

	var jsonTour;

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

	function keyCode(element){
		var left = 39;
		var right = 37;
		var esc = 27;
		var stepsSize = hopscotch.getCurrTour().steps.length -1;
		$('body').off('keyup').on('keyup', function(e){
			var key = e.keyCode
			if( hopscotch.getCurrStepNum() < stepsSize ){
				if( key === 39){	hopscotch.nextStep(); }
				if( key === 37 ){	hopscotch.prevStep(); }
			}
			if( key === 27  ){	hopscotch.endTour();  }
		});
	}

	function setCookie(){
		if($.cookie("cookie_tour") != "true"){
			$(config.selectors.open).click();
			$.cookie('cookie_tour', "true");
		}
	}

	function initTour(){
		hopscotch.endTour();
		hopscotch.startTour(jsonTour);
		keyCode();
		closeWelcomeTour();
	}

	function openWelcomeTour(e){
		e.preventDefault();
		$(config.selectors.tour).toggleClass('on');
		$(config.selectors.init).focus().attr('tabindex', '-1');
	}

	function closeWelcomeTour(){
		$(config.selectors.tour).removeClass('on');
	}

	function userAborted(xhr) {
		return !xhr.getAllResponseHeaders();
	}


	return {
		init: init,
		openWelcomeTour: openWelcomeTour,
		closeWelcomeTour: closeWelcomeTour
	};

}());
