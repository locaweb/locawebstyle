describe("Toggle text: ", function(){

  beforeEach(function(){
    loadFixtures('toggle_text_fixture.html');
  });

  describe("When the element has data-event='click'", function(){
    it("should be changed on click event", function(){
      locastyle.init($(document));
      var textToExample = $("#toggle-text-click").data("text");
      $("#toggle-text-click").trigger('click');
      expect($("#toggle-text-click").text()).toEqual(textToExample);
    });
  });

  describe("When the element has data-event='mouseover'", function(){
    it("should be changed on mouseover event", function(){
      locastyle.init($(document));
      var textToExample = $("#toggle-text-mouseover").data("text");
      $("#toggle-text-mouseover").trigger('mouseover');
      expect($("#toggle-text-mouseover").text()).toEqual(textToExample);
    });
  });

});