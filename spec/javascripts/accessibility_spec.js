describe("Accessibility", function() {
  beforeEach(function() {
    loadFixtures('accessibility_fixture.html');
    locastyle.accessibility.init();
  });

  describe("DOM manipulation", function () {
    it("should prepend defined html on .header if .title-content exists", function(){
      expect($('.area-access')).toExist();
    });
    it("should prepend defined html on .header if attr data-access exists", function(){
      expect($('.menu-access')).toExist();
    });
    it("should prepend defined html on .menu if submenu exists", function(){
      expect($('.menu li').find('ul')).toHaveClass('submenu');
    });
    it("should defined links of menu if contain attr role menuitem", function(){
      expect($('.menu')).toContain('a[role="menuitem"]');
    });
    it("should have atrr tabindex in alert", function(){
      expect($('#alert_yes')).toHaveAttr('tabindex', '-1');
    });
    it("should not have atrr tabindex in alert", function(){
      expect($('#alert_no')).not.toHaveAttr('tabindex', '-1');
    });
    it("should focus alert", function(){
      var element = $('#alert_yes').attr('id');
      expect($(':focus').attr('id')).toEqual(element);
    });

  });
  describe("Submenu Access events of keyboard and mouse", function(){
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
        expect($('#submenu_parent')).not.toHaveClass('in');
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
