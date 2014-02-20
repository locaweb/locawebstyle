describe("Accessibility: ", function() {
  beforeEach(function() {
    loadFixtures('accessibility_fixture.html');
  });

  describe('Dom scope', function () {
    it('should init submenu inside given dom scope', function () {
      locastyle.accessibility.init($("#scoped_dom"));
      expect($('.menu#inside_scope_menu li').find('ul').hasClass("submenu")).toBeTruthy();
    });
    it('should init submenu inside given dom scope', function () {
      locastyle.accessibility.init($("#scoped_dom"));
      expect($('.menu#outside_scope_menu li').find('ul').hasClass("submenu")).toBeFalsy();
    });
  });

  describe('Document as scope', function () {
    beforeEach(function() {
      locastyle.accessibility.init($(document));
    });

    describe("DOM manipulation", function () {
      it("should prepend defined html on .header if .title-content exists", function(){
        expect($('.area-access')[0]).not.toBeUndefined();
      });
      it("should prepend defined html on .header if attr data-access exists", function(){
        expect($('.menu-access')[0]).not.toBeUndefined();
      });
      it("should prepend defined html on .menu if submenu exists", function(){
        expect($('.menu li').find('ul').hasClass("submenu")).toBeTruthy();
      });
      it("should defined links of menu if contain attr role menuitem", function(){
        expect($('.menu').find('a[role="menuitem"]')[0]  ).not.toBeUndefined();
      });
      it("should have atrr tabindex in alert", function(){
        expect( $('.alert-focus').attr('tabindex') ).toEqual('-1');
      });

      it("should focus alert", function(){
        var element = $('#alert_yes').attr('id');
        expect($(':focus').attr('id')).toEqual(element);
        $('#alert_yes').blur();
      });

      describe('with clock manipulation', function () {
        beforeEach(function() {
          jasmine.clock().install();
        });

        afterEach(function() {
          jasmine.clock().uninstall();
        });

        it("should modal have focus element .auto-focus class", function(){
          var elementToBeFocused = $('#modal_focus').get(0);
          $('#modal_click').click();
          jasmine.clock().tick(500);
          expect(elementToBeFocused).toEqual(document.activeElement);
        });

        it("should collapse have focus element .auto-focus class", function(){
          var elementToBeFocused = $('#collapse_focus').get(0);
          $('#collapse_click').click();
          jasmine.clock().tick(500);
          expect(elementToBeFocused).toEqual(document.activeElement);
        });
      });

    });

    describe("Wai aria in tabs", function(){
      it("should tabs have attr role tab", function(){
        expect($('.nav-tabs a').attr('role')).toEqual('tab');
      });
      it("should tabs have attr aria-selected false", function(){
        expect($('.nav-tabs a').attr('aria-selected')).toEqual('false');
      });
      it("should tabs have attr aria-hidden true", function(){
        expect($('.nav-tabs a').attr('aria-hidden')).toEqual('true');
      });
      it("should tabs have attr aria-selected true", function(){
        expect($('.nav-tabs .active a').attr('aria-selected')).toEqual('true');
      });
      it("should tab .active have attr aria-hidden false", function(){
        expect($('.nav-tabs .active a').attr('aria-hidden')).toEqual('false');
      });
    });

    describe("Submenu Access", function(){
      describe("when focus on .menu a", function(){
        it("should add .in class on parent li", function(){
          $('#submenu_test').trigger('focus');
          expect($('#submenu_parent')).toHaveClass('in');
        });
        it("should change aria-expanded attr to true", function(){
          $('#submenu_test').trigger('focus');
          expect($('#submenu_parent > ul').attr('aria-expanded')).toEqual('true');
        });
        it("should change aria-hidden attr to false", function(){
          $('#submenu_test').trigger('focus');
          expect($('#submenu_parent > ul').attr('aria-hidden')).toEqual('false');
        });
      });
      describe("when blur on .menu a", function(){
        it("should remove .in class on parent li", function(){
          $('#submenu_parent').addClass('in');
          $('#submenu_test').trigger('blur');
          expect( $('#submenu_parent').hasClass('in') ).toBeFalsy();
        });
        it("should change aria-expanded attr to false", function(){
          $('#submenu_parent > ul').attr('aria-expanded','true');
          $('#submenu_test').trigger('blur');
          expect($('#submenu_parent > ul').attr('aria-expanded')).toEqual('false');
        });
        it("should change aria-hidden attr to true", function(){
          $('#submenu_parent > ul').attr('aria-hidden','false');
          $('#submenu_test').trigger('blur');
          expect($('#submenu_parent > ul').attr('aria-hidden')).toEqual('true');
        });
      });
    });
  });

});
