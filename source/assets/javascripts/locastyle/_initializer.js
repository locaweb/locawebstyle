$(window).load(function() {
  locastyle.trackEvents.init($(document));
  locastyle.init($(document));
  locastyle.mobile.init($(document));
  locastyle.bootstrap.init($(document));
  locastyle.forms.init();
  locastyle.tables.init();
  locastyle.passwordStregth.init($(document));
  locastyle.accessibility.init($(document));
  locastyle.collapse.init($(document));
});
