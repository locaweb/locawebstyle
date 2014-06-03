describe('Custom Fields:', function(){
  beforeEach(function(){
    loadFixtures('custom-fields_fixture.html');
    locastyle.customFields.init();
  });

  describe('When have data-ls-module="customFields"', function(){
    it('all selects should have before element with .ls-field-custom-select-one', function(){
      expect($('#myAwesomeSelect select').parent().find('.ls-field-custom-select-one')).toBeTruthy();
    })
  });

  describe("Unbind", function() {
  	it("should bind change only one time on the element", function() {
  		locastyle.customFields.init();
  		locastyle.customFields.init();
  		expect($('#trueId')).toHaveBeenBindedOnce('change');
  	});
  });
});
