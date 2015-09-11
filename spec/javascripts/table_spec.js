describe('Table: ', function() {

  beforeEach(function() {
    loadFixtures('table_fixture.html');
    locastyle.table.init();
  });

  describe('when click on checkbox', function() {
    it('should check if the line is checked', function() {
      var elem = $('tbody tr:first-child');
      elem.find('input[type=checkbox]').trigger('click.ls');
      expect(elem.hasClass('is-checked')).toBe(true);
    });

    it('should check if all the checkboxes are checked', function() {
      $('thead tr').find('input[type=checkbox]').trigger('click.ls');
      $('tbody tr').each(function() {
        expect($(this).hasClass('is-checked')).toBe(true);
      });
    });

    it('should check if all the checkboxes are not checked', function() {
      var elem = $('thead tr');
      // The first click to select all cheboxes
      elem.find('input[type=checkbox]').trigger('click.ls');
      // The second click to deselect all checkboxes
      elem.find('input[type=checkbox]').trigger('click.ls');
      $('tbody tr').each(function() {
        expect($(this).hasClass('is-checked')).toBe(false);
      });
    });
  });

});
