describe("Alert element: ", function(){
  beforeEach(function(){
    loadFixtures('alert_fixture.html');
    locastyle.alert.init();
  });

  describe("Check if there wai-aria", function(){
    it("when the html alert has the attribute role", function(){
      expect($("#alert").attr('role')).toEqual('alert');
    });
  });

});
