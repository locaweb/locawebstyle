describe("Steps: ", function(){
  beforeEach(function(){
    loadFixtures('steps_fixture.html');
    locastyle.steps.init();
  });

  describe('#init', function(){
    describe('When loading the page', function(){
      it('should get text on attr title and insert on aria-label', function() {
        var title = $('#list1 .ls-steps-btn').attr('title');
        expect($('#list1 .ls-steps-btn').attr('aria-label')).toEqual(title);
      });

      it('actives the step that has ls-active class', function(){
        expect($('#step2').hasClass('ls-active')).toBe(true);
      });

      it('should have the data-index attribute on .ls-steps-mobile', function() {
        expect($('.ls-steps-mobile').data('index')).toBe('2 de 4');
      });

      it('should have the data-title attribute on .ls-steps-mobile', function() {
        expect($('.ls-steps-mobile').data('title')).toBe('Aparência');
      });
    });
  });

  describe('When click on .ls-steps-mobile', function() {
    it('should add the ls-active class on steps container', function() {
      $('.ls-steps-mobile').trigger('click');
      expect($('.ls-steps').hasClass('ls-active')).toBe(true);
    });
  });

  describe('When change the step', function() {
    beforeEach(function() {
      $('#next2').trigger('click');
    });

    it('should change the .ls-steps-mobile data-index attribute', function() {
      expect($('.ls-steps-mobile').data('index')).toBe('3 de 4');
    });

    it('should change the .ls-steps-mobile data-title attribute', function() {
      expect($('.ls-steps-mobile').data('title')).toBe('Conteúdo');
    });
  });

  describe('#bindClickOnTriggers', function(){
    describe("when click in an actived navigation link", function(){
      beforeEach(function(){
        this.button = $('#list1 .ls-steps-btn');
        this.target = this.button.data('target') || this.button.attr('href');
        this.button.trigger('click');
      });

      it("activates the content related to the step", function(){
        expect($(this.target).hasClass('ls-active')).toBe(true);
      });

      it("should the LI father have ls-active class", function(){
        expect(this.button.parents('li').hasClass('ls-active')).toBe(true);
      });
    });
  });

  describe('#addActivedNav', function(){
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
         expect($el.hasClass('ls-active')).toBe(true);
      });
    });
  });

  describe("when click in disabled step", function(){
    it("nothing should happen", function(){
      var $button = $('#list4 .ls-steps-btn');
      var target = $button.data('target') || $button.attr('href');
      $button.trigger('click');
      expect($(target).hasClass('ls-active')).toBe(false);
    });
  });

  describe('nextStep', function(){
    describe("when call the nextStep", function(){
      beforeEach(function(){
        locastyle.steps.nextStep();
      });

      it("checks the active list and adds in the next ls-active class", function(){
        expect($('#list3').hasClass('ls-active')).toBe(true);
      });

      it('changes actived tab aria-selected to true', function(){
        expect($('.ls-steps-nav li.ls-active .ls-steps-btn').attr('aria-selected')).toEqual('true');
      });

      it('changes actived content aria-hidden to false', function(){
        expect($('.ls-steps-content.ls-active').attr('aria-hidden')).toEqual('false');
      });
    });

    describe('when NextStepEvent is prevented', function(){
      it('does not change to next step', function(){
        $(document).on('NextStepEvent', function(e){ e.preventDefault(); });
        locastyle.steps.nextStep();
        expect($('#list3').hasClass('ls-active')).toBe(false);
        $(document).off('NextStepEvent');
      });
    });

    describe('when BeforeNextStep is prevented', function(){
      it('does not change to next step', function(){
        $(document).on('BeforeNextStep', function(e){ e.preventDefault(); });
        locastyle.steps.nextStep();
        expect($('#list3').hasClass('ls-active')).toBe(false);
        $(document).off('BeforeNextStep');
      });
    });

    describe('AfterNextStep', function(){
      it('triggers this event after change the step', function(){
        var activeStepId = 'lala';
        $(document).on('AfterNextStep', function(){
          activeStepId = $('.ls-steps-content.ls-active').attr('id');
        });
        locastyle.steps.nextStep();
        expect(activeStepId).toEqual('step3');
        $(document).off('AfterNextStep');
      });
    });

    describe('bind button', function(){
      it('when click change to next step', function(){
        $('#next2').trigger('click');
        expect($('#list3').hasClass('ls-active')).toBe(true);
      });
    });
  });

  describe('prevStep', function(argument){
    it("checks the active list and adds in the prev ls-active class", function(){
      locastyle.steps.prevStep();
      expect($('#list1').hasClass('ls-active')).toBe(true);
    });

    describe('when PrevStepEvent is prevented', function(){
      it('does not change to prev step', function(){
        $(document).on('PrevStepEvent', function(e){ e.preventDefault() });
        locastyle.steps.prevStep();
        expect($('#list1').hasClass('ls-active')).toBe(false);
        $(document).off('PrevStepEvent');
      });
    });

    describe('when BeforePrevStep is prevented', function(){
      it('does not change to prev step', function(){
        $(document).on('BeforePrevStep', function(e){ e.preventDefault(); });
        locastyle.steps.prevStep();
        expect($('#list1').hasClass('ls-active')).toBe(false);
        $(document).off('BeforePrevStep');
      });
    });

    describe('AfterPrevStep', function(){
      it('triggers this event after change the step', function(){
        var activeStepId = 'lala';
        $(document).on('AfterPrevStep', function(){
          activeStepId = $('.ls-steps-content.ls-active').attr('id');
        });
        locastyle.steps.prevStep();
        expect(activeStepId).toEqual('step1');
        $(document).off('AfterPrevStep');
      });
    });

    describe('bind button', function(){
      it('when click change to prev step', function(){
        $('#prev2').trigger('click');
        expect($('#list1').hasClass('ls-active')).toBe(true);
      });
    });
  });

  describe('#ariaSteps', function() {
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

    it(".ls-steps-content has attribute aria-hidden has value true ",function(){
      expect($('.ls-steps-content').attr('aria-hidden')).toEqual('true');
    });
  });

  describe("#unbind", function() {
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

  describe("Public methods", function() {
    it("should respond to nextStep", function() {
      expect(locastyle.steps.nextStep).toBeDefined();
    });
    it("should respond to prevStep", function() {
      expect(locastyle.steps.prevStep).toBeDefined();
    });
  });
});
