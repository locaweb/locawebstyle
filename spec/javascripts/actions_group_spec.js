describe("Group's actions of Locaweb Style", function() {

  beforeEach(function() {
    loadFixtures('actions_group_fixture.html');
  });

  describe("Desktop", function() {

    beforeEach(function() {
      locastyle.mobile.config.isMobile = false;
      locastyle.mobile.mobileGroupActions($(document));
    });

    it("actions dropdown don't have text 'Ações'", function(){
      var textDropdown = $('.ls-group-actions .dropdown-toggle').text();
      expect( $.trim( textDropdown ) ).toEqual( '' );
    });

    it("should link have btn-primary class",function(){
      var $btn = $('.ls-group-actions').find('.btn-primary');
      expect( $btn.size() ).toEqual( 1 );
    });

  });

  describe("Mobile", function() {

    beforeEach(function() {
      locastyle.mobile.config.isMobile = true;
      locastyle.mobile.mobileGroupActions($(document));
    });

    it("actions dropdown have text 'Ações'", function(){
      var textDropdown = $('.ls-group-actions .dropdown-toggle').text();
      expect( $.trim( textDropdown ) ).toEqual( 'Ações' );
    });

    it("should no exist link with btn-primary class",function(){
      var $btn = $('.ls-group-actions').find('.btn-primary');
      expect( $btn.size() ).toEqual( 0 );
    });

  });
});