describe("Lists of Locaweb Style", function() {

  beforeEach(function() {
    loadFixtures('lists_fixture.html');
  });

  describe("Desktop", function() {

    beforeEach(function() {
      locastyle.lists.config.isXsmall = false;
      locastyle.lists.init($(document));
    });

    it("actions dropdown don't have text 'Ações'", function(){
      var textDropdown = $('.ls-list-actions .dropdown-toggle').text();
      expect( $.trim( textDropdown ) ).toEqual( '' );
    });

    it("should link have btn-primary class",function(){
      var $btn = $('.ls-list-actions').find('.btn-primary');
      expect( $btn.size() ).toEqual( 1 );
    });

  });

  describe("Mobile", function() {

    beforeEach(function() {
      locastyle.lists.config.isXsmall = true;
      locastyle.lists.init($(document));
    });

    it("actions dropdown have text 'Ações'", function(){
      var textDropdown = $('.ls-list-actions .dropdown-toggle').text();
      expect( $.trim( textDropdown ) ).toEqual( 'Ações' );
    });

    it("should no exist link with btn-primary class",function(){
      var $btn = $('.ls-list-actions').find('.btn-primary');
      expect( $btn.size() ).toEqual( 0 );
    });

  });
});