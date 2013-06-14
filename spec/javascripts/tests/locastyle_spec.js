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
          $(".boxCollapse.second .collapse").trigger("shown");
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
        var dom_scope = $("#only_focus_modal");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        $("#modal_to_be_focused").show();
        $("#modal_to_be_focused").trigger("shown");
        expect($(".autoFocus")).toBeFocused();
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

  describe("Open collapses with error", function () {
    describe("When there are errors inside a collapse", function () {
      it("should open automatically", function () {
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        spyOnEvent($('#collapse_with_error'), 'show');
        locastyle.base.init(dom_scope);
        expect("show").toHaveBeenTriggeredOn($('#collapse_with_error'));
      });
    });
  });

  describe("Modal auto open", function () {
    it("should open modals with the css class '.modalAutoOpen'", function () {
      loadFixtures('modal_auto_open.html');
      var dom_scope = $("#modal_auto_open_fixture");
      var locastyle = new Locastyle();
      locastyle.base.init(dom_scope);
      expect($(".modalAutoOpen").data("modal").isShown).toEqual(true);
    });
  })

  describe("Pathway step counter", function () {
    it("should add a css class step(number) related to the number of steps", function () {
      var dom_scope = $("#locastyle_fixture");
      var locastyle = new Locastyle();
      locastyle.base.init(dom_scope);
      expect($("#my_pathway", dom_scope)).toHaveClass("steps3");
    });
  });

  describe("List detail", function () {
    it("should add a hr.sep element after each dd tag", function () {
      var dom_scope = $("#locastyle_fixture");
      var locastyle = new Locastyle();
      locastyle.base.init(dom_scope);
      expect($("#list_detail_test .listDetail").find("hr.sep").size()).toEqual(2);
    });
  });

  describe("Advanced search:", function(){
    describe("When advanced search has at least a input with value", function(){
      it("should add the class .in to .advancedSearch", function(){
        var dom_scope = $("#locastyle_fixture");
        $("#advanced_search_test #input1").val("has value");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        expect($("#advanced_search_test")).toHaveClass("in");
      });
    });
  });

  describe("Toggle child: ", function(){
    describe("When click on .lnkToggle", function(){
      it("should toggle .dNone in .itemToToggle", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        $(".lnkToggle").trigger("click");
        expect($("#toggleClassTest .itemToToggle")).toHaveClass("dNone");
      });

      it("should toggle data-class on self", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        $(".lnkToggle").trigger("click");
        expect($(".toggleChild#toggleClassTest")).toHaveClass("myClassToToggle");
      });

      it("should call toggleChildValue on self", function() {
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        spyOn(locastyle.base, 'toggleChildValue');
        $(".lnkToggle").trigger("click");
        expect(locastyle.base.toggleChildValue).toHaveBeenCalled();
      });

      it("should call lnkToggleFinish event", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        spyOnEvent($('.lnkToggle'), 'lnkToggleFinish');
        $(".lnkToggle").trigger("click");
        expect("lnkToggleFinish").toHaveBeenTriggeredOn($(".lnkToggle"));
      });
    });

    describe("When click on .btn.lnkToggle", function(){
      it("should replace related inputs value with this data-value", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        $("#toggleClassTest #input_with_value").val("fake typed value");
        $("#toggleClassTest .btn.lnkToggle").trigger("click");
        expect($("#toggleClassTest #input_with_value").val()).toEqual("here is a value");
      });
    });
  });

  describe("Data-value on fields: ", function(){
    it("should add a data-value attribute with self value", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        expect($("#data_value_fields input").attr("data-value")).toEqual($("#data_value_fields input").val());
    });
  });

  describe("Collapse auto open", function(){
    describe("When it is called", function(){
      it("should add the .active css class the parent .boxCollapse related to the received selector", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        locastyle.base.collapseAutoOpen("#collapse_test");
        expect($("#collapse_to_test_auto_open")).toHaveClass("active");
      });

      it("should add the .in css class to the .collapse related to the received selector", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        locastyle.base.collapseAutoOpen("#collapse_test");
        expect($("#collapse_to_test_auto_open #collapse_test")).toHaveClass("in");
      });
    });
  });

  describe("Carousel counter: ", function(){
    it("should fill the counter related with the .item quantity", function(){
      var dom_scope = $("#locastyle_fixture");
      var locastyle = new Locastyle();
      locastyle.base.init(dom_scope);
      expect($("#my_carousel_counter .carouselNav i").text()).toEqual("3");
    });

    it("should update the .carouselNav <b> value with item has .active", function(){
      var dom_scope = $("#locastyle_fixture");
      var locastyle = new Locastyle();
      locastyle.base.init(dom_scope);
      $("#my_carousel_counter").trigger("slid");
      expect($("#my_carousel_counter .carouselNav b").text()).toEqual("2");
    });
  });

  describe("Custom select: ", function(){
    it("should init select2 on elements with .customSelect", function(){
      var dom_scope = $("#locastyle_fixture");
      var locastyle = new Locastyle();
      locastyle.base.init(dom_scope);
      expect($("#select_to_be_tested div.select2-container.selectToBeTested")).toExist();
    });
  });

  describe("Alert notification: ", function(){
    describe("When click on .lnkNoShow: ", function(){
      it("should set a cookie named as trigger data-target", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        $(".lnkNoShow").trigger("click");
        expect($.cookie("#alert_notification_test")).toEqual("true");
      });

      it("should remove the elements with the trigger data-target id", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        $(".lnkNoShow").trigger("click");
        expect($("#alert_notification_test")).not.toExist();
      });
    });

    describe("When page loads: ", function(){
      it("should remove the elements with the id equal to cookies set", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        $.cookie("#element_to_vanish", true);
        locastyle.base.init(dom_scope);
        expect($("#element_to_vanish")).not.toExist();
      });
    });
  });

  describe("Box chamadas:", function(){
    describe("When click on .minShortcuts", function(){
      it("should create a minShortcuts cookie", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        $(".minShortcuts").trigger("click");
        expect($.cookie("minShortcuts")).toEqual("true");
      });

      it("should toogle .microBox", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        $.cookie("minShortcuts", false);
        locastyle.base.init(dom_scope);
        $(".minShortcuts").trigger("click");
        expect($(".expandBox")).toHaveClass("microBox");
      });

      it("should remove the minShortcuts cookie if it already exists", function(){
        var dom_scope = $("#locastyle_fixture");
        var locastyle = new Locastyle();
        locastyle.base.init(dom_scope);
        $(".minShortcuts").trigger("click");
        expect($.cookie("minShortcuts")).toEqual("false");
      });
    });

    describe("When page loades: ", function(){
      it("should add .microBox if minShortcuts cookie exists", function(){
        var dom_scope = $("#min_shortcuts_fixture");
        var locastyle = new Locastyle();
        $.cookie("minShortcuts", true);
        locastyle.base.init(dom_scope);
        expect($("#min_shortcuts_fixture .expandBox")).toHaveClass("microBox");
      });
    });
  });

});
