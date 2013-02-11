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

    describe("Numbers only", function () {
      it("should watch keyup event and allow only numbers in a input with .numbersOnly css class", function () {
        var locastyle = new Locastyle();
        var insertedValue = "1l2o3c4a5";
        $(".numbersOnly").val(insertedValue)
        var expectedValue = "12345";
        locastyle.base.init($(document));
        $(".numbersOnly").trigger("keyup");
        expect($(".numbersOnly").val()).toEqual(expectedValue);
      });
    });

    describe("Collapse activation", function () {
      describe("When a collapse has class .in", function () {
        it("should add .active css class on the parent .boxCollapse", function () {
          var locastyle = new Locastyle();
          locastyle.base.init($(document));
          expect($(".boxCollapse.second")).toHaveClass("active");
        });
      });

      describe("When a collapse shown", function () {
        it("should add .active css class on the parent .boxCollapse", function () {
          var locastyle = new Locastyle();
          locastyle.base.init($(document));
          $(".boxCollapse.first [data-toggle='collapse']").trigger("click");
          $(".boxCollapse.first .collapse").trigger("shown");
          expect($(".boxCollapse.first")).toHaveClass("active");
        });
      });

      describe("When a collapse hide", function () {
        it("should remove .active css class on the parent .boxCollapse", function () {
          var locastyle = new Locastyle();
          locastyle.base.init($(document));
          $(".boxCollapse.second [data-toggle='collapse']").trigger("click");
          $(".boxCollapse.second .collapse").trigger("hide");
          expect($(".boxCollapse.second")).not.toHaveClass("active");
        });
      })
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

  describe("HTML ForceClass", function () {
    it("should put a .forceClass on HTML tag", function (){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        expect($("html")).toHaveClass("forceClass");
    });
  });

  describe("Class .disabled in form fields", function () {
    it("should put a .disabled in inputs, selects and textareas that have DISABLE or READONLY attributes", function (){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        expect($("input[disabled], select[disabled], textarea[disabled], input[readonly], select[readonly], textarea[readonly]")).toHaveClass("disabled");
    });
  });

  describe("Parent Class on Li parent", function () {
    it("should put a .parent in LI element that have a UL as a child", function (){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        expect($("#menuPrincipal li")).toHaveClass("parent");
    });
  });

  describe("Auto focus in modals", function () {
    describe("When modals triggers shown event", function () {
      it("should activate focus on fields with the .autoFocus css class", function () {
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        $(".modal_to_focus_trigger").trigger("click");
        $("#modal_to_be_focused").show();
        $("#modal_to_be_focused").trigger("shown");
        expect($(".autoFocus").is(":focus")).toEqual(true);
      });
    });
  });

  describe("Prevent default event", function () {
    it("should prevent default events in elements with the .btn.disabled css classes", function () {
      var dom_scope = $("#locastyle_fixture");
      var locastyle = new Locastyle();
      locastyle.base.init(dom_scope);
      spyOnEvent($('#disable_me'), 'click');
      $('#disable_me').click();
      expect("click").toHaveBeenPreventedOn($("#disable_me"));
    });
  });
});
