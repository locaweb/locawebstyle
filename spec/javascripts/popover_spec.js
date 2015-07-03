describe('Popover: ', function() {
  beforeEach(function() {
    loadFixtures('popover_fixture.html');
    locastyle.popover.init();
  });

  afterEach(function() {
      locastyle.popover.destroyPopover();
  });

  describe('Popover creation', function() {

    it('Should create one popover for each trigger', function() {
      var elems     = document.querySelectorAll('[data-ls-module="popover"]').length;
      var popovers = document.querySelectorAll('.ls-popover').length;
      expect(elems).toEqual(popovers);
    });

  });

  describe('Popover behavior', function() {

    it('Should show a popover on click event', function() {
      $('.ls-popover').hide();
      $('#popoverclick').trigger("click");
      expect($('.ls-popover').eq(0).css('display')).toEqual("block");
    });

    it('Should add ls-active class on opened popover', function() {
      $('.ls-popover').hide();
      $('#popoverclick').trigger("click");
      expect($('.ls-popover').eq(0).hasClass('ls-active')).toEqual(true);
    });

    it('Should show and close .ls-popover on repeated click events', function() {
      $('.ls-popover').hide();
      $('#popoverclick').trigger('click');
      $('#popoverclick').trigger('click');
      expect($('.ls-popover').eq(0).css('display')).toEqual("none");
    });

    it('Should remove ls-active class on closed popover', function() {
      $('.ls-popover').hide();
      $('#popoverclick').trigger('click');
      $('#popoverclick').trigger("click");
      expect($('.ls-popover').eq(0).hasClass('ls-active')).toEqual(false);
    });


    it('Should show a popover on hover event', function() {
      $('.ls-popover').hide();
      $('#popoverhover').trigger('mouseenter');
      expect($('.ls-popover').eq(1).css('display')).toEqual("block");
    });

    it('Should close a popover on mouseleave event', function() {
      $('.ls-popover').hide();
      $('#popoverhover').trigger('mouseenter');
      $('#popoverhover').trigger('mouseleave');
      expect($('.ls-popover').eq(1).css('display')).toEqual("none");
    });

  });

  describe('[unbind] When init is called multiple times', function () {

    it('should bind events on popover elements only one time', function () {
      locastyle.init();
      locastyle.init();
      locastyle.init();
      var $popoverTrigger = $('#popoverclick');
      var $popover = $('#ls-popover-' + $popoverTrigger.data('uniqueId'));
      $popover.hide();
      $popoverTrigger.trigger('click');
      $popoverTrigger.trigger('click');
      expect( $popover ).not.toBeVisible();
    });
  });

  describe('change component on small screens', function () {
    it('should not create a popover in small screens', function () {
      locastyle.breakpointClass = 'ls-window-sm';
      locastyle.popover.destroyPopover();
      locastyle.popover.init();
      var $popoverTrigger = $('#popoverclick');
      var $popover = $('#ls-popover-' + $popoverTrigger.data('uniqueId'));
      expect( $popover[0] ).toBeUndefined();
    });

    it('should open popover as modal in small screens', function () {
      locastyle.breakpointClass = 'ls-window-sm';
      locastyle.popover.init();
      var $popoverTrigger = $('#popoverclick');
      expect( $('.ls-modal') ).not.toBeUndefined();
    });

  });

});
