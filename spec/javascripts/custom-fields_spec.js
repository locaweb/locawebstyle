describe('Custom Fields:', function(){
  beforeEach(function(){
    loadFixtures('custom-fields_fixture.html');
    locastyle.customFields.init();
  });

  describe('When have .ls-custom', function(){
    it('all selects should have before element with .ls-field-custom-select-one', function(){
      expect($('#myAwesomeSelect select').parent().find('.ls-field-custom-select-one')).toBeTruthy();
    })

    it('all checkboxes should have before element with .ls-field-custom-checkbox', function(){
      expect($('#myAwesomeCheckbox select').parent().find('.ls-field-custom-checkbox')).toBeTruthy();
    })

  })
});
