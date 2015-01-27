 describe("Locastyle in general: ", function() {

  beforeEach(function() {
    loadFixtures('sidebars_fixture.html');
    locastyle.sidebars.init();
  });

  describe("Submenu Toggle", function() {
    describe("When click on link of ls-submenu-parent", function() {
      it("should add .ls-active class in ls-submenu-parent", function() {
        $(".ls-submenu-parent > a").trigger("click");
        expect($(".ls-submenu-parent").hasClass("ls-active")).toEqual(true);
      });
      it("should remove .ls-active class on self", function() {
        $(".ls-submenu-parent.ls-active > a").trigger("click");
        expect($(".ls-submenu-parent").hasClass("ls-active")).toEqual(false);
      });
    });
  });

  describe("Submenu with wai-aria", function() {

    it("should has attribute aria-expanded equal false", function() {
      expect($(".ls-submenu-parent").attr('aria-expanded')).toEqual('false');
    });

    it("When submenu is clicked should has attribute aria-expanded equal true", function() {
      $(".ls-submenu-parent > a").trigger("click");
      expect($(".ls-submenu-parent").attr('aria-expanded')).toEqual('true');
    });

    it("should has attribute aria-hidden equal true", function() {
      expect($(".ls-submenu-parent").attr('aria-hidden')).toEqual('true');
    });

    it("When submenu is clicked should has attribute aria-hidden equal false", function() {
      $(".ls-submenu-parent > a").trigger("click");
      expect($(".ls-submenu-parent").attr('aria-hidden')).toEqual('false');
    });

  });

  describe("Menu with wai-aria", function() {
    it("should has attribute role equal navigation", function() {
      expect($('.ls-menu').attr('role')).toEqual('navigation');
    });

    it("UL should has attribute role equal menu", function() {
      expect($('.ls-menu ul').attr('role')).toEqual('menu');
    });

    it("Links should has attribute role equal menuitem", function() {
      expect($('.ls-menu a').attr('role')).toEqual('menuitem');
    });
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

  describe("When .ls-sidebar has .ls-area-account", function() {
    it("should add the .ls-area-account-active css class on .ls-sidebar element", function() {
      expect($('.ls-sidebar').hasClass('ls-area-account-active')).toEqual(true);
    });
  });

  describe("When .ls-notifications has exist", function() {
    it("should add span on .ls-topbar", function() {
      expect($('.ls-topbar .ls-show-notifications').length).toEqual(1);
    });
  });

  describe("Unbind:", function() {
    describe("when unbind is called in module", function() {
      it("should unbind events handled by sidebar module", function() {
        locastyle.sidebars.unbind();
        expect($._data($(".ls-show-sidebar")[0], "events")).toEqual(undefined);
      });
      it("should unbind events handled by notifications module", function() {
        locastyle.sidebars.unbind();
        expect($._data($(".ls-show-notifications")[0], "events")).toEqual(undefined);
      });
    });
  });
});
