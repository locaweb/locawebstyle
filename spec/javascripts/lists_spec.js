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
      expect( textDropdown  === '' ).toBe( true );
    });

    it("should link have btn-primary class",function(){
      var $btn = $('.ls-list-actions').find('a');
      expect( $btn.hasClass('btn-primary') ).toBe( true );
    });

  });

  describe("Mobile", function() {

    beforeEach(function() {
      locastyle.lists.config.isXsmall = true;
      locastyle.lists.init($(document));
    });

    it("actions dropdown have text 'Ações'", function(){
      locastyle.lists.config.isXsmall = true;
      var textDropdown = $('.ls-list-actions .dropdown-toggle').text();
      expect( textDropdown  === 'Ações' ).toBe( true );
    });

    it("should no exist link with btn-primary class",function(){
      var $btn = $('.ls-list-actions').find('.btn-primary');
      expect( $btn.size() === 0 ).toBe( true );
    });

  });
});