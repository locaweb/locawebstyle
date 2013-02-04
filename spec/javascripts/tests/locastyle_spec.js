describe("Locastyle", function() {
  beforeEach(function () {
    loadFixtures('locastyle.html');
  });

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

  describe("On init", function () {
    describe("Datepicker", function () {
      it("should call datepicker with correct options", function () {
        var locastyle = new Locastyle();
        spyOn(locastyle.base, 'datePickerSetup');
        var expectedOptions = {
          showOn: "button",
          dateFormat: "dd/mm/yy",
          monthNamesShort: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
          monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
          dayNames: ['Domingo','Segunda-feira','Ter&ccedil;a-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
          dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
          dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
        }
        locastyle.base.init($(document));
        expect(locastyle.base.datePickerSetup).toHaveBeenCalledWith($(document), expectedOptions);
      });
    });
  });

  describe("Toggle text", function () {
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

});
