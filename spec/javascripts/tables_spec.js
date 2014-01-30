describe("Tables", function() {

  beforeEach(function(done) {
    loadFixtures('tables.html');
    locastyle.forms.init();
    locastyle.tables.init();
  });

  it("group actions checkbox are always enabled", function(){
      expect( $('#groupCheckbox1') ).toHaveAttr('disabled');
  });

});
