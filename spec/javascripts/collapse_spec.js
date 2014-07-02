describe('Collapse:', function() {
  beforeEach(function() {
    loadFixtures('collapse_fixture.html');
    locastyle.collapse.init();
  });

  afterEach(function() {
  });


  describe('Single', function() {

    it('should open and close after two clicks', function() {
      var $collapse = $('#collapse1')
      var $collapseTitle = $collapse.find('.ls-collapse-header');
      $collapseTitle.trigger("click");
      expect($collapse.hasClass('ls-collapse-open')).toBe(true);
      $collapseTitle.trigger("click");
      expect($collapse.hasClass('ls-collapse-open')).toBe(false);
    });

    it('with class .ls-collapse-open-always dont close on click', function() {
      var $collapse = $('#collapse3')
      var $collapseTitle = $collapse.find('.ls-collapse-header');
      $collapseTitle.trigger("click");
      expect($collapse.hasClass('ls-collapse-open')).toBe(false);
    });

  });

  describe('With input checkbox', function () {

    it('checked on load, collapse starts open', function () {
      var $collapse = $('#collapse9');
      $collapse.find('input').trigger('change');
      expect($collapse.hasClass('ls-collapse-open')).toBe(true);
    });

    it('when check, open ', function () {
      var $collapse = $('#collapse8');
      $collapse.find('input').prop('checked', true).trigger('change');
      expect($collapse.hasClass('ls-collapse-open')).toBe(true);
    });

    it('when check, later uncheck close ', function () {
      var $collapse = $('#collapse8');
      $collapse.find('input').prop('checked', true).trigger('change');
      expect($collapse.hasClass('ls-collapse-open')).toBe(true);
      $collapse.find('input').prop('checked', false).trigger('change');
      expect($collapse.hasClass('ls-collapse-open')).toBe(false);
    });

  });


  describe('With input radio', function () {

    it('checked on load, collapse starts open', function () {
      var $collapse = $('#collapse10');
      $collapse.find('input').trigger('change');
      expect($collapse.hasClass('ls-collapse-open')).toBe(true);
    });

    it('check a item of group, open it, close the others', function () {
      var $collapse1 = $('#collapse11');
      var $collapse2 = $('#collapse10');
      $collapse1.find('input').prop('checked', true).trigger('change');
      expect($collapse1.hasClass('ls-collapse-open')).toBe(true);
      expect($collapse2.hasClass('ls-collapse-open')).toBe(false);
      $collapse2.find('input').prop('checked', true).trigger('change');
      expect($collapse1.hasClass('ls-collapse-open')).toBe(false);
      expect($collapse2.hasClass('ls-collapse-open')).toBe(true);
    });

  });

  describe('Group / Accordeon', function() {

    it('open collapse, close others', function() {
      var $collapseClose = $('#collapse4');
      var $collapseCloseTitle = $collapseClose.find('.ls-collapse-header');
      var $collapseOpen = $('#collapse5');
      var $collapseOpenTitle = $collapseOpen.find('.ls-collapse-header');
      $collapseOpenTitle.trigger("click");
      expect($collapseOpen.hasClass('ls-collapse-open')).toBe(true);
      expect($collapseClose.hasClass('ls-collapse-open')).toBe(false);
      $collapseCloseTitle.trigger("click");
      expect($collapseOpen.hasClass('ls-collapse-open')).toBe(false);
      expect($collapseClose.hasClass('ls-collapse-open')).toBe(true);
    });

  });

  describe('Buttons/Links behavior', function() {

    it('click button with data-toggle-collapse="#id" toggle collapse open/close collapse', function() {
      var $button = $('#button1');
      var $collapse = $('#collapse6');
      var $collapseTitle = $collapse.find('.ls-collapse-header');
      $button.trigger("click");
      expect($collapse.hasClass('ls-collapse-open')).toBe(true);
      $button.trigger("click");
      expect($collapse.hasClass('ls-collapse-open')).toBe(false);

    });
  });

  describe('Module methods', function() {

    it('locastyle.collapse.toggle(#id) open/close collapse', function() {
      var $collapse = $('#collapse7');
      locastyle.collapse.toggle('#collapse7')
      expect($collapse.hasClass('ls-collapse-open')).toBe(true);
      locastyle.collapse.toggle('#collapse7')
      expect($collapse.hasClass('ls-collapse-open')).toBe(false);

    });
  });

  describe("Unbind", function() {
    it("should bind click only one time on the button with [data-toggle-collapse]", function() {
      locastyle.collapse.init();
      locastyle.collapse.init();
      expect($('#button1')).toHaveBeenBindedOnce('click');
    });

    it("should bind click only one time on the collapse header", function() {
      locastyle.collapse.init();
      locastyle.collapse.init();
      expect($('#collapse1 .ls-collapse-header')).toHaveBeenBindedOnce('click');
    });
  });

});
