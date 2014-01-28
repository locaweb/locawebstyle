describe("Collapses: ", function(){

  beforeEach(function(){
    loadFixtures('collapses_fixture.html');
    locastyle.collapse.init($(document));
  });

  describe("When page load", function(){
    it("should .ls-collapse has .active", function(){
      expect($("#haveActiveClassOnLoad").hasClass('active')).toBeTruthy();
    })
  })

  describe("When click in .ls-collapse", function(){
    it("should add .active in it", function(){
      $("#addActiveClass").trigger("show.bs.collapse");
      expect($(".ls-collapse").hasClass('active')).toBeTruthy();
    });
  });

  describe("When .ls-collapse has .active", function(){
    it("should on click remove .active", function(){
      $("#removeActiveClass").trigger("hide.bs.collapse");
      expect($(".ls-collapse").hasClass('active')).toBeTruthy();
    });
  });

  describe("When checkbox has checked", function(){
    it("should open collapse and add .active on .panel-collapse", function(){
      $('#checkbox1').is('checked');
      expect($("#collapse_checkbox1").hasClass('in')).toBeTruthy();
    });
  });

  describe("When checkbox not checked", function(){
    it("should collapse must be closed", function(){
      $('#checkbox2').not('checked');
      expect($("#collapse_checkbox2").hasClass('in')).toBeFalsy();
    });
  });

  describe("When radio has clicked", function(){
    it("should collapse must be opened", function(){
      $('#radio1').trigger('hide.bs.collapse');
      expect($("#collapse_radio1").hasClass('in')).toBeTruthy();
    });
  });

});
