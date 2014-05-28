 describe("Locastyle in general: ", function() {

  beforeEach(function() {
    loadFixtures('sidebars_fixture.html');
    locastyle.sidebars.init();
  });

  describe("Sidebar toggle", function() {
  	describe("when click on .ls-show-sidebar", function() {
  		it("should add the .ls-sidebar-visible css class on html tag", function() {
  			$(".ls-show-sidebar").trigger('click');
  			expect($('html').hasClass('ls-sidebar-visible')).toEqual(true);
  		});
  	});
  });

  describe("Notifications toggle", function() {
  	describe("when click on .ls-show-notifications", function() {
  		it("should add the .ls-notifications-visible css class on html tag", function() {
  			$('.ls-show-notifications').trigger('click');
  			expect($('html').hasClass('ls-notifications-visible')).toEqual(true);
  		});
  	});
  });

  describe("Unbind:", function() {
    describe("when unbind is called in module", function() {
      it("should not remove the .ls-sidebar-visible css class from html tag", function() {
        $('html').removeClass('ls-sidebar-visible');
        locastyle.sidebars.unbind();
        $('.ls-show-sidebar').trigger('click');
        expect($('html').hasClass('ls-sidebar-visible')).toEqual(false);
      });
      it("should not remove the .ls-notifications-visible css class from html tag", function() {
        $('html').removeClass('ls-notifications-visible');
        locastyle.sidebars.unbind();
        $('.ls-show-notifications').trigger('click');
        expect($('html').hasClass('ls-notifications-visible')).toEqual(false);
      });
    });
  });
});
