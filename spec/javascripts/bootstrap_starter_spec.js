describe("Bootstrap starter: ", function() {
  describe('When dom_scope is given', function () {
    beforeEach(function() {
      loadFixtures('bootstrap_starter_fixture.html');
      locastyle.bootstrap.init($("#scoped_tags"));
    });

    it('should NOT bind events on elements outside dom_scope', function () {
      expect($._data( $("#outside_scope_tolltip")[0], "events" )).toEqual(undefined);
    });

    it('should bind events on elements inside dom_scope', function () {
      expect($._data( $("#inside_scope_tolltip")[0], "events" ).mouseover[0].namespace).toEqual("tooltip");
    });
  });

});
