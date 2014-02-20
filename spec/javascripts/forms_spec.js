describe("Forms", function() {

  beforeEach(function() {
    loadFixtures('forms.html');
  });

  describe("Dom Scope", function(){
    it("inputs also have attr disabled", function(){
      locastyle.forms.init($("#formParent"));
      expect($('#enabledTextInput1')).toHaveAttr('disabled');
    });
  });

  describe("When have or not the attribute disabled", function () {
    beforeEach(function(){
      locastyle.forms.init($(document));
    });

    describe("When has attr disabled", function () {

      it("inputs also have attr disabled", function(){
        expect( $('#enabledTextInput1') ).toHaveAttr('disabled');
      });

      it("and a link with [data-toggle-form-edit] is clicked, form is editable", function(){
        $('#enableForm1').trigger('click');
        expect( $('#enabledTextInput1') ).not.toHaveAttr('disabled');
      });

      it("and a link with [data-toggle-form-edit] is clicked again, form is NOT editable", function(){
        $('#enableForm1').trigger('click').trigger('click');
        expect( $('#enabledTextInput1') ).toHaveAttr('disabled');
      });

      it("and function formEditable(formId, TRUE) is called, form is editable ", function(){
        locastyle.forms.formEditable('#formWithDisable', true);
        expect( $('#enabledTextInput1') ).not.toHaveAttr('disabled');
      });

      it("and function formEditable(formId, FALSE) is called, form is NOT editable ", function(){
        locastyle.forms.formEditable('#formWithDisable', false);
        expect( $('#enabledTextInput1') ).toHaveAttr('disabled');
      });


    });

    describe("When NOT has attr disabled", function () {

      it("inputs will NOT have attr disabled", function(){
        expect( $('#enabledTextInput2') ).not.toHaveAttr('disabled');
      });

      it("and a link with [data-toggle-form-edit] is clicked, form is NOT editable", function(){
        $('#enableForm2').trigger('click');
        expect( $('#enabledTextInput2') ).toHaveAttr('disabled');
      });

      it("and a link with [data-toggle-form-edit] is clicked, form IS editable", function(){
        $('#enableForm2').trigger('click').trigger('click');
        expect( $('#enabledTextInput2') ).not.toHaveAttr('disabled');
      });

      it("and function formEditable(formId, FALSE) is called, form is NOT editable ", function(){
        locastyle.forms.formEditable('#formWithoutDisable', false);
        expect( $('#enabledTextInput2') ).toHaveAttr('disabled');
      });

      it("and function formEditable(formId, TRUE) is called, form is NOT editable ", function(){
        locastyle.forms.formEditable('#formWithoutDisable', true);
        expect( $('#enabledTextInput2') ).not.toHaveAttr('disabled');
      });

    });
  });
});
