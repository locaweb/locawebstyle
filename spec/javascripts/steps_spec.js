describe("Steps: ", function(){
  beforeEach(function(){
    loadFixtures('steps_fixture.html');
    locastyle.steps.init();
  });

  describe("when click in steps is actived", function(){
    it("activates the content related to the step", function(){
      var $button = $('#list1 .ls-steps-btn');
      var target = $button.data('target') || $button.attr('href');
      $button.trigger('click');
      expect($(target).hasClass('ls-active')).toBe(true);
    });

    it("LI father should have the class ls-active", function(){
      var $button = $('#list1 .ls-steps-btn');
      $button.trigger('click');
      expect($button.parents('li').hasClass('ls-active')).toBe(true);
    });
  });

  describe("when ls-steps-nav > li is actived", function(){
    it("should add the class ls-actived in all previous LI", function(){
      var index = $('.ls-steps-nav .ls-active').index();
      index = parseInt(index + 1);
      var $el = $('.ls-steps-nav li:lt(' + index + ')');
      expect($el.hasClass('ls-active')).toBe(true);
    });

    it("should add the class ls-active in content related to order", function(){
      var index = $('.ls-steps-nav .ls-active').index();
      var $el = $('.ls-steps-content').eq(index);
      console.log($el)
       expect($el.hasClass('ls-active')).toBe(true);
    });

  });

  describe("when click in steps is disabled", function(){
    it("nothing should happen", function(){
      var $button = $('#list4 .ls-steps-btn');
      var target = $button.data('target') || $button.attr('href');
      $button.trigger('click');
      expect($(target).hasClass('ls-active')).toBe(false);
    });
  });

  describe("when click in the button actions", function(){
    it("checks the active list and adds in the next ls-active class", function(){
      $('.ls-active #next2').trigger('click');
      expect($('#list3').hasClass('ls-active')).toBe(true);
    });

    it("checks the active list and adds in the prev ls-active class", function(){
      $('.ls-active #prev2').trigger('click');
      expect($('#list1').hasClass('ls-active')).toBe(true);
    });
  });

  describe("Steps with wai-aria", function() {
    it(".ls-steps-nav should has attribute role with value tablist ",function(){
      expect($('.ls-steps-nav').attr('role')).toEqual('tablist');
    });

    it("Link steps should has attribute role with value tab ",function(){
      expect($('.ls-steps-nav .ls-steps-btn').attr('role')).toEqual('tab');
    });

    it("Active link steps should has attribute aria-selected is value true ",function(){
      expect($('.ls-steps-nav li.ls-active .ls-steps-btn').attr('aria-selected')).toEqual('true');
    });


    it("Link steps should has attribute aria-selected is value false ",function(){
      expect($('.ls-steps-nav .ls-steps-btn').attr('aria-selected')).toEqual('false');
    });

    it(".ls-steps-content has attribute role with value tabpanel ",function(){
      expect($('.ls-steps-content').attr('role')).toEqual('tabpanel');
    });

    it("When click tab should has attribute aria-selected with value true ",function(){
      $('.ls-steps-nav .ls-steps-btn').trigger('click');
      expect($('.ls-steps-nav li.ls-active .ls-steps-btn').attr('aria-selected')).toEqual('true');
    });

  });

  describe("Unbind:", function() {
    describe("when unbind is called in module", function() {
      it("should unbind events handled in button steps", function() {
        locastyle.steps.unbind();
        $('#list1 .ls-steps-btn').trigger("click");
        expect($('#list').hasClass("ls-active")).toEqual(false);
      });
    });

    describe("when unbind is called in module", function() {
      it("should unbind events handled in the next button steps", function() {
        locastyle.steps.unbind();
        $('#next2').trigger("click");
        expect($('#step3').hasClass("ls-active")).toEqual(false);
      });
    });

    describe("when unbind is called in module", function() {
      it("should unbind events handled in the prev button steps", function() {
        locastyle.steps.unbind();
        $('#prev2').trigger("click");
        expect($('#step1').hasClass("ls-active")).toEqual(false);
      });
    });
  });

});
