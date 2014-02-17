$(window).load(function() {
  locastyle.trackEvents.init($(document));
  locastyle.init($(document));
  locastyle.mobile.init($(document));
  locastyle.bootstrap.init($(document));
  locastyle.forms.init($(document));
  locastyle.tables.init();
  locastyle.passwordStregth.init($(document));
  locastyle.accessibility.init();
  locastyle.collapse.init($(document));
});
