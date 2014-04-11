describe("Initializer: ", function() {
  beforeEach(function() {
    loadFixtures('initializer_fixture.html');
  });

  describe("When page loads", function() {
    it("should call init on modal since it is a present module", function() {
      spyOn(locastyle.modal, 'init');
      locastyle.init();
      expect(locastyle.modal.init).toHaveBeenCalled();
    });

    it("should call init on tabs since it is a present module", function() {
      spyOn(locastyle.tabs, 'init');
      locastyle.init();
      expect(locastyle.tabs.init).toHaveBeenCalled();
    });

    it("should NOT call init on collapse since it is a NOT present module", function() {
      spyOn(locastyle.collapse, 'init');
      locastyle.init();
      expect(locastyle.collapse.init).not.toHaveBeenCalled();
    });
  });

});
