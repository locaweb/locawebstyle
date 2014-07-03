describe("Locastyle in general: ", function() {

  beforeEach(function() {
    loadFixtures('general_fixture.html');
    locastyle.general.init();
  });


  describe("Submenu Toggle ", function() {

    describe("When click on any link element of ls-submenu", function() {
      it("should add .ls-active class on self", function() {
        $(".ls-submenu > a").trigger("click");
        expect($(".ls-submenu").hasClass("ls-active")).toEqual(true);
      });

      it("should remove .ls-active class on self", function() {
        $(".ls-submenu.ls-active > a").trigger("click");
        expect($(".ls-submenu").hasClass("ls-active")).toEqual(false);
      });

    });
  });

  describe("Activation Group button toggle", function() {
    describe("When click on any .btn element inside an .ls-group-active", function() {

      it("should remove any .ls-active class from siblings", function() {
        $("#activation_toggle_button_2").trigger("click");
        expect($("#activation_toggle_button_1").hasClass('ls-active')).toEqual(false);
      });

      it("should add .ls-active class on self", function() {
        $("#activation_toggle_button_3").trigger("click");
        expect($("#activation_toggle_button_3").hasClass("ls-active")).toEqual(true);
      });

    });
  });

  describe("Submenu:", function() {
    describe("When click on .ls-sumenu > a", function(){
      it("should add 'ls-active' class on parent", function(){
        $("#parent_link2").trigger("click");
        expect($("#submenu_test1 #parent_item2").hasClass("ls-active")).toEqual(true);
      });
    });

    describe("When submenu have the 'ls-active' css class", function(){
      it("should add 'ls-active' class on parent .ls-submenu item", function(){
        expect($("#submenu_test1 #parent_item1").hasClass("ls-active")).toEqual(true);
      });
    });
  });


  describe("Unbind:", function() {
    describe("Auto events", function () {
      it("should not bind the same event twice os elements with auto event", function(){
        locastyle.init();
        locastyle.init();
        expect($("[data-toggle-class]")).toHaveBeenBindedOnce("click");
      });
    });

    describe("Custom events", function () {
      it("should not bind the same event twice os elements with custom event", function(){
        locastyle.init();
        locastyle.init();

        // clean prevent default events
        $("a").off("click.lsPreventDefault");

        expect($('[data-ls-fields-enable]')).toHaveBeenBindedOnce("click");
        expect($('.ls-submenu > a')).toHaveBeenBindedOnce("click");
        expect($(".ls-disabled, [disabled='disabled']")).toHaveBeenBindedOnce("click");

      });
    });
  });

  describe("Disabled", function(){
    describe("when element has class .ls-disabled", function(){
      it("should not make action", function(){
        $("#myModal").trigger('click');
        expect($('#myAwesomeModal').hasClass("opened")).toEqual(false);
      })
    })

    describe("when element has attribute disabled", function(){
      it("should not make action", function(){
        $("#myModal").trigger('click');
        expect($('#myAwesomeModal').hasClass("opened")).toEqual(false);
      })
    })

  });

  describe('Toggle', function() {

    describe('Class: ', function() {

      describe('any element', function () {

        it('without target togle class of himself', function () {
          var $elem = $('#toggleTextWithoutTarget');
          $elem.trigger('click');
          expect($elem.hasClass('any-class')).toBe(false);
          $elem.trigger('click');
          expect($elem.hasClass('any-class')).toBe(true);
        });

        it('with [data-toggle-class] toggle class of target', function () {
          var $elem = $('#toggleTextWithTarget');
          var $target = $('#target1');
          $elem.trigger('click');
          expect($target.hasClass('ls-display-none')).toBe(false);
          $elem.trigger('click');
          expect($target.hasClass('ls-display-none')).toBe(true);
        });

      });

      describe('Checkbox', function () {

        it('Remove class when checkbox is checked', function () {
          var $checkbox = $('#toggleClassCheckbox');
          $checkbox.trigger('click');
          expect($('#configs').hasClass('ls-display-none')).toBe(false);
        });

        it('Add class when checkbox not checked', function () {
          var $checkbox = $('#toggleClassCheckbox');
          $checkbox.prop('checked', true);
          $checkbox.trigger('click')
          expect($('#configs').hasClass('ls-display-none')).toBe(true);
        });

      });

      describe('Radio group - ', function () {

        it('on radio check, remove class of target', function () {
          var $radio = $('#radio1');
          $radio.prop('checked', true).trigger('click');
          expect($('#opt1').hasClass('ls-display-none')).toBe(false);
        });

        it('on check another radio, remove class from his target, add class in target of old checked radio', function () {
          var $radio1 = $('#radio1');
          var $radio2 = $('#radio2');
          var $target1 = $('#opt1');
          var $target2 = $('#opt2');
          $radio1.prop('checked', true).trigger('click');
          expect($target1.hasClass('ls-display-none')).toBe(false);
          $radio2.prop('checked', true).trigger('click');
          expect($target1.hasClass('ls-display-none')).toBe(true);
          expect($target2.hasClass('ls-display-none')).toBe(false);
        });

      });

    });


  });

});
