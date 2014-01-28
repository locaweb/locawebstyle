$(window).load(function() {
  window.locastyle = new Locastyle();

  locastyle.base.init($(document));
  locastyle.passwordStrength.init();
  locastyle.sumValues.init();
});
