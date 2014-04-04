describe('Custom Fields:', function(){
  beforeEach(function(){
    loadFixtures('custom-fields_fixture.html');
    locastyle.customFields.init();
  });

  describe('When have .ls-form', function(){
    it('all selects should have before element with .ls-field-custom-select-one', function(){
      expect($('#myAwesomeId select').parent().find('.ls-field-custom-select-one')).toBeTruthy();
    })
  })

});
