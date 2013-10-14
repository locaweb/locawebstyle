var locastyleManual = (function() {
	'use strict';

	function init(){
		syntaxHightlight();
	}

	function syntaxHightlight() {
		prettyPrint();
	}

	return {
		init: init
	};

}());

$(window).load(function() {
	locastyleManual.init();
});