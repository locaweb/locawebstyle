describe("Forms: ", function() {
  beforeEach(function() {
    loadFixtures('forms_fixture.html');
    locastyle.form.init();
  });

  describe("Toggle field when click on .ls-toggle-pass", function(){
    it("should change input type password to text", function(){
      $("#mypassword a").trigger('click');
      expect($('#mypassword #password_field').attr('type')).toEqual('text')
    })
  })

});
