describe('Table: ', function() {

  beforeEach(function() {
    loadFixtures('table_fixture.html');
    locastyle.table.init();
  });

  describe('when click on checkbox', function() {
    it('should validate if the line has the ls-selected class', function() {
      var elem = $('#myTable tbody tr:first-child');
      elem.find('input[type=checkbox]').trigger('click.ls');
      expect(elem.hasClass('ls-selected')).toBe(true);
    });

    it('should validate if all the tbody tr has the ls-selected class', function() {
      $('#myTable thead tr').find('input[type=checkbox]').trigger('click.ls');
      $('#myTable tbody tr').each(function() {
        expect($(this).hasClass('ls-selected')).toBe(true);
      });
    });

    it('should validate if all the tbody tr has not the ls-selected class', function() {
      var $elem = $('#myTable thead tr');
      // The first click to select all cheboxes
      $elem.find('input[type=checkbox]').trigger('click.ls');
      // The second click to deselect all checkboxes
      $elem.find('input[type=checkbox]').trigger('click.ls');
      $('#myTable tbody tr').each(function() {
        expect($(this).hasClass('ls-selected')).toBe(false);
      });
    });

    it('should check the main checkbox when all the other checkboxes are checked', function() {
      var $checkboxes = $('#myTable tbody').find('input[type=checkbox]');
      $checkboxes.each(function() {
        $(this).trigger('click.ls');
      });
      expect($('#myTable thead').find('input[type=checkbox]').prop('checked')).toBe(true);
    });

    it('should uncheck the main checkbox when all the other checkboxes are unchecked', function() {
      var $checkboxes = $('#checkedTable tbody').find('input[type=checkbox]');
      $checkboxes.each(function() {
        $(this).trigger('click.ls');
      });
      expect($('#checkedTable thead').find('input[type=checkbox]').prop('checked')).toBe(false);
    });
  });

  describe('When load the module with all the sub checkboxes in checkedTable', function() {
    it('should check the main checkbox', function() {
      expect($('#checkedTable thead').find('input[type=checkbox]').prop('checked')).toBe(true);
    });

    it('should add the ls-selected class to each closest checkbox tr that is checked', function() {
      var $checkboxes = $('#checkedTable tbody tr').find('input[type=checkbox]');

      $checkboxes.each(function() {
        if ($(this).prop('checked')) {
          expect($(this).closest('tr').hasClass('ls-selected')).toBe(true);
        }
      });
    });
  });

});
