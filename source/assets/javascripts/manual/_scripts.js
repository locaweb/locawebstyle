var locastyleManual = (function() {
	'use strict';

	function init(){
		syntaxHightlight();
		pageActive();
	}

	function syntaxHightlight() {
		prettyPrint();
	}

	function pageActive(){
		pageActive = window.location+"";
		pageActive = pageActive.split("/").pop();
		if(pageActive != ""){
			$('a[href$="'+pageActive+'"]').addClass('active');
		}
	}

	return {
		init: init
	};

}());

$(window).load(function() {
	locastyleManual.init();
});