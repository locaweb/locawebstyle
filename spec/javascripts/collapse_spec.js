describe('Collapse:', function() {
  beforeEach(function() {
    loadFixtures('collapse_fixture.html');
    locastyle.collapse.init();
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
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

    it('with class .ls-collapse-always-open dont close on click', function() {
      var $collapse = $('#collapse3')
      var $collapseTitle = $collapse.find('.ls-collapse-header');
      $collapseTitle.trigger("click");
      expect($collapse.hasClass('ls-collapse-open')).toBe(false);
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

});
