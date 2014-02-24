describe("Tables", function() {

  beforeEach(function() {
    loadFixtures('tables_fixtures.html');
  });

  describe("Dom Scope", function(){
    it("when clicked in checkbox inside td, add class in the tr parent", function(){
      locastyle.tables.init($("#myTable"));
      $("#myCheckboxTable").trigger("click");
      expect($('#myTr').hasClass('selected')).toBeTruthy();
    });
  });

  describe("Always", function() {

    beforeEach(function() {
      locastyle.forms.init();
      locastyle.tables.init($(document));
    });

    it("group actions checkbox in header start enabled", function(){
        expect( $('#groupCheckbox1') ).not.toHaveAttr('disabled');
    });

    it("actions in box group actions, start enabled", function(){
      $('.ls-table-group-actions').find('button').each(function(i, action){
        expect( $(action) ).not.toHaveAttr('disabled');
      });
    });

    it("check input line, show group actions", function(){
      var $groupActions = $('.ls-table-group-actions');
      $groupActions.hide();
      $('#complex-table tbody tr:eq(0) td:eq(0) :checkbox').click();
      expect( $('.ls-table-group-actions') ).toBeVisible();
    });

    it("uncheck input line, hide group actions", function(){
      var $groupActions = $('.ls-table-group-actions');
      $groupActions.hide();
      $('#complex-table tbody tr:eq(0) td:eq(0) :checkbox').click();
      $('#complex-table tbody tr:eq(0) td:eq(0) :checkbox').click();
      expect( $('.ls-table-group-actions') ).toBeHidden();
    });

    it("group actions count equal inputs checked", function(){
      var $groupActions = $('.ls-table-group-actions');
      $('#complex-table tbody tr:eq(0) td:eq(0) :checkbox').click();
      $('#complex-table tbody tr:eq(1) td:eq(0) :checkbox').click();
      expect( $('.counterChecks', $groupActions ).text() ).toEqual('2');
      // uncheck
      $('#complex-table tbody tr:eq(1) td:eq(0) :checkbox').click();
      expect( $('.counterChecks', $groupActions ).text() ).toEqual('1');
    });

    it("only if all lines checkbox checked, header check checked", function(){
       $('#complex-table tbody').find(':checkbox').trigger('click');
        expect( $('#groupCheckbox1') ).toBeChecked();
        $('#complex-table tbody tr:eq(0) td:eq(0) :checkbox').click();
        expect( $('#groupCheckbox1') ).not.toBeChecked();
    });


    // on delete row, if only checked, hide group actions
    it("have same classes in tbody>tr>td  that the equivalent cell header", function(){
      var $complexTable = $('#complex-table'),
          hasSameClasses = true;
      $( 'th', $complexTable).each(function(ith, th){
        var thHeaderClasses = $(th).attr('class');
        $( 'tbody tr', $complexTable).each(function(itr, tr){
          $( 'td', tr).eq( ith ).hasClass(thHeaderClasses);
            if( thHeaderClasses  ){
              if( !$( 'td', tr).eq( ith ).hasClass(thHeaderClasses) ){
                hasSameClasses = false;
                return hasSameClasses;
              }
            }
        });
      });
      expect( hasSameClasses ).toBe( true );;
    });

    it("last line, dropdown drop up", function(){
      expect( $('#complex-table tbody tr:eq(2)').find('.btn-group') ).not.toHaveClass('dropup');
      expect( $('#complex-table tbody tr:last()').find('.btn-group') ).toHaveClass('dropup');
    });

    it("click in link/button with [data-action-modal='edit'] show modal with editable form", function(){
      $('#complex-table tbody').find('[data-action-modal="edit"]').eq(0).trigger('click');
      expect( $('#template-modal').find('form') ).not.toHaveAttr('disabled');
    });

  });

  describe("Desktop", function() {

    beforeEach(function() {
      locastyle.tables.config.isXsmall = false;
      locastyle.tables.init($(document));
    });

    it("if has only one action, show one button", function(){
      var $complexTable = $('#complex-table'),
          isButton = true;
      $('tbody td.ls-table-actions', $complexTable).each(function(itd, td){
        var $actions = $(td).find('a, button');
        if( $actions.size() === 1 ){
          if ( !$actions.eq(0).hasClass('btn') && !( $(td).find('.btn-group').size() === 0 ) ){
            isButton = false;
            return isButton;
          }
        }
      });
      expect( isButton ).toBe( true );;
    });

    it("if has more than one action, show dropdow", function(){
      var $complexTable = $('#complex-table'),
          hasDropdown = false;
      $('tbody td.ls-table-actions', $complexTable).each(function(itd, td){
        var $actions = $(td).find('a, button');
        if( $actions.size() > 1 ){
          if ( $(td).find('.btn-group').size() === 1  ){
            hasDropdown = true;
            return hasDropdown;
          }
        }
      });
      expect( hasDropdown ).toBe( true );;
    });

  });

  describe("Mobile", function() {

    beforeEach(function() {
      locastyle.tables.config.isXsmall = true;
      locastyle.tables.init($(document));
    });

    afterEach(function() {
      $('#template-modal').remove();
      $('.overlay-bar').remove();
      $('.modal-backdrop').remove();
    });

    it("actions always inside dropdown", function(){
      var $complexTable  = $('#complex-table');
      var numberLines    = $complexTable.find('tbody tr').size();
      var numberDropdown = $complexTable.find('td.ls-table-actions .btn-group').size();
      expect( numberLines === numberDropdown ).toBe( true );;
    });

    it("always have action 'Visualizar'", function(){
      var $complexTable  = $('#complex-table');
      var numberLines    = $complexTable.find('tbody tr').size();
      var numberActionView = $complexTable.find('td.ls-table-actions [data-action-modal="view"]').size();
      expect( numberLines === numberActionView ).toBe( true );;
    });

    it("actions dropdown dont have text 'Ações'", function(){
      var $complexTable  = $('#complex-table');
      var textDropdown = $complexTable.find('td.ls-table-actions .dropdown-toggle').text();
      expect( jQuery.trim( textDropdown ) === '' ).toBe( true );
    });

    it("click everywhere in line, except actions column, open modal", function(){
      $('#complex-table tbody tr:eq(0) td:eq(0)').trigger('click');
      $('#complex-table tbody tr:eq(0) td:eq(1)').trigger('click');
      $('#complex-table tbody tr:eq(0) td.ls-table-actions').trigger('click');
      expect( $('#template-modal').size() === 1 ).toBe( true );
    });

  });

});
