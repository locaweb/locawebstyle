var locastyleManual = (function() {
	'use strict';

  function init(){
		syntaxHightlight();
		inputsMask();
  }

  function syntaxHightlight() {
  	prettyPrint();
  }

  function inputsMask() {
		$('.date-mask').mask('00/00/0000');
		$('.time-mask').mask('00:00:00');
		$('.date-time-mask').mask('00/00/0000 00:00:00');
		$('.cep-mask').mask('00000-000');
		$('.phone-mask').mask('0000-0000');
		$('.phone-ddd-mask').mask('(00) 0000-0000');
		$(".cel-sp-mask").mask('(00) 00009-0000');
		$('.mixed-mask').mask('AAA 000-S0S');
		$('.cpf-mask').mask('000.000.000-00', {reverse: true});
  }

  return {
    init: init
  };

}());

$(window).load(function() {
  locastyleManual.init();
});