describe('Custom Fields:', function(){
  beforeEach(function(){
    loadFixtures('custom-fields_fixture.html');
    locastyle.customFields.init();
  });

  describe('When have class="ls-custom-select"', function(){
    it('selects all should have wrap with class ls-custom-select', function(){
      expect($('#select1').parent().hasClass('ls-custom-select')).toEqual(true);
    });
  });

  describe('When select have class="ls-select"', function(){
    it('selects all should have the class ls-select', function(){
      expect($('#select1').hasClass('ls-select')).toEqual(true);
    });
  });

});
