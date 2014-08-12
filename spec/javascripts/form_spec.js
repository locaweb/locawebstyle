describe("Forms: ", function() {
  beforeEach(function() {
    loadFixtures('forms_fixture.html');
    locastyle.form.init();
  });

  describe("Toggle field when click on .ls-toggle-pass", function(){
    it("should change input type password to text", function(){
      $("#mypassword a").trigger('click');
      expect($('#mypassword #password_field').attr('type')).toEqual('text');
    });
    it("should change input type text to password", function(){
      $("#mytypetext a").trigger('click');
      expect($('#mytypetext #password_field2').attr('type')).toEqual('password');
    });
  });

  describe("When bind at .ls-toggle-pass if have data-toggle-class", function(){
    it("should toggle class at this", function(){
      $("#changeClass").trigger('click');
      expect($("#changeClass").hasClass('my-new-class')).toBe(true);
    });
  });

  describe("When exist textarea", function(){
    it("textarea has atribute height", function(){
      expect($("textarea")).toHaveCss({ height: "18px" });
    });
  });

});
