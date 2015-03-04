var locastyle = locastyle || {};

locastyle.guidedTour = (function() {
  'use strict';

	var jsonTour;

	var config = {
		selectors : {
			init:  '.ls-btn-tour',
			tour:  '.ls-alerts-list .ls-ico-question'
		}
	};

	function init(jsonSteps){
		checkTour(jsonSteps);
	}

	// Override default selectors if user provide
	function checkTour(jsonSteps){
		if(jsonSteps && jsonSteps.selectors && hopscotch){
			$.each( config.selectors, function(key){
				jsonSteps.selectors[key] = jsonSteps.selectors[key] || config.selectors[key];
			});
			setTour(jsonSteps);
			setCookie();
		}
	}

	function setTour(tour){
		jsonTour = tour;
		$(config.selectors.init).on({click: initTour});
	}

	function openWelcomeTour(e){
    $(config.selectors.tour).trigger('click');
    $(config.selectors.init).focus().attr('tabindex', '-1');
		return e ? e.preventDefault() : null;
	}

	function initTour(){
    locastyle.topbarCurtain.hideCurtains();
		hopscotch.endTour();
		hopscotch.startTour(jsonTour, 0);
		keyCode();
	}

	function keyCode(){
		var left = 39;
		var right = 37;
		var esc = 27;
		var stepsSize = hopscotch.getCurrTour().steps.length;
		$('body').off('keyup').on('keyup', function(e){
			var key = e.keyCode;
			if( hopscotch.getCurrStepNum() < stepsSize && hopscotch.getState() ){
				if( key === left ){ hopscotch.nextStep(); }
				if( key === right ){ hopscotch.prevStep(); }
			}
			if( key === esc ){	hopscotch.endTour();  }
		});
	}

	function setCookie(){
		if($.cookie("cookie_tour") !== "true"){
			$(config.selectors.tour).trigger('click');
      $(config.selectors.init).focus().attr('tabindex', '-1');
			$.cookie('cookie_tour', "true");
		}
	}

	return {
		init: init,
		openWelcomeTour: openWelcomeTour
	};

}());
