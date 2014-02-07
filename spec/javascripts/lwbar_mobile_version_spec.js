describe("Lwbar mobile version: ", function(){
  beforeEach(function(){
  	locastyle.mobile.init($(document));
    loadFixtures('lwbar_mobile_version_fixture.html');
  });

  describe("Verify if has lwbar", function(){
    it("HTML should have with-lwbar* class", function(){
      expect($('#lwbar-header').length > 0).toEqual(true);
    });
  });

  describe("Mount html of mobile version", function(){
    it(".nav-content should have base html of mobile version", function(){
      var lwbarMobileHtml = '<div class="lwbar-id ico-user"><span class="lwbar-login-name"></span><span class="lwbar-plan"></span></div>';
      $('.nav-content').prepend(lwbarMobileHtml);
      expect($(".lwbar-id").length).toBeTruthy()
    });
  });

});