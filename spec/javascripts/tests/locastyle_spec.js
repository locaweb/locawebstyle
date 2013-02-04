describe("Locastyle", function() {
  describe("Constructing", function () {
    describe("Before constructing", function () {
      it("should be a function", function () {
        var locastyle = Locastyle;
        expect(typeof(locastyle)).toEqual("function");
      });
    });

    describe("After constructing", function () {
      it("should be an object", function () {
        var locastyle = new Locastyle();
        expect(typeof(locastyle)).toEqual("object");
      });

      it("should have an inherited init function", function () {
        var locastyle = new Locastyle();
        expect(typeof(locastyle.base.init)).toEqual("function");
      });
    });
  });

  describe("Toggle text", function () {
    beforeEach(function () {
      loadFixtures('locastyle.html');
    });

    describe("when an element has data-toggle_text='click' attribute", function () {
      it("should replace the text when clicked on it", function () {
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        var textToBeApplied = $("#toggle_text").data("text");
        locastyle.base.init(dom_scope);
        $('[data-toggle_text="click"]').click();
        expect($("#toggle_text").text()).toEqual(textToBeApplied);
      });

      it("should also replace the data-text attribute when clicked on it", function () {
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        var text = $("#toggle_text").text();
        locastyle.base.init(dom_scope);
        $('[data-toggle_text="click"]').click();
        expect($("#toggle_text").data("text")).toEqual(text);
      });
    });

    describe("when an element has data-toggle_text='hover' attribute", function () {
      it("should replace the text when mouse over on it", function () {
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        var textToBeApplied = $("#toggle_text_on_hover").data("text");
        locastyle.base.init(dom_scope);
        $('[data-toggle_text="hover"]').mouseover();
        expect($("#toggle_text_on_hover").text()).toEqual(textToBeApplied);
      });

      it("should also replace the data-text attribute when mouse over on it", function () {
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        var text = $("#toggle_text_on_hover").text();
        locastyle.base.init(dom_scope);
        $('[data-toggle_text="hover"]').mouseover();
        expect($("#toggle_text_on_hover").data("text")).toEqual(text);
      });
    });
  });

  describe(":tab", function () {

  });
});
