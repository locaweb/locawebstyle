describe("Forms", function() {

  beforeEach(function() {
    loadFixtures('forms.html');
    locastyle.forms.init();
  });

  describe("When has attr disabled", function () {

    it("inputs also have attr disabled", function(){
      expect( $('#disabledTextInput') ).toHaveAttr('disabled');
    });

    it("and a link with [data-toggle-form-edit] is clicked, form is editable", function(){
      $('#enableForm').trigger('click');
      expect( $('#disabledTextInput') ).not.toHaveAttr('disabled');
    });

    it("and a link with [data-toggle-form-edit] is clicked again, form is not editabe", function(){
      $('#enableForm').trigger('click').trigger('click');
      expect( $('#disabledTextInput') ).toHaveAttr('disabled');
    });

    it("and function formEditable(formId, true) is called, form is editable ", function(){
      locastyle.forms.formEditable('#formWithDisable', true);
      console.log( $('#disabledTextInput')[0] )
      expect( $('#disabledTextInput') ).not.toHaveAttr('disabled');
    });

  }); // disable forms

});
