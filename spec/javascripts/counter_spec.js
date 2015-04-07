describe("Counter char: ", function(){
  beforeEach(function(){
    loadFixtures('counter_fixture.html');
    locastyle.charCounter.init();
  });

  describe("When input or textarea call module charCounter and attribute maxlength", function(){
    it("should create a element with .ls-char-count after input", function(){
      expect($("#myCounter input").parent().find('.ls-char-count')).toExist();
    });

    it("should when keypress, decrease number of limit", function(){
      var event = $.Event("keyup");
      var $inputMaxlength = $("#myCounterTrigger input");
      event.which = 65;
      $inputMaxlength.trigger(event);
      expect($("#myCounterTrigger").find('.ls-char-count').text()).toEqual('6');
    });

  });

});
