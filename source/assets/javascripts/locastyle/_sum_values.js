Locastyle.prototype.sumValues = (function() {
  'use strict';

  var config = {
    selector: {
      container: '.ls-sum-values-container',
      item: '.sumItem',
      elemTrigger: ':radio, :checkbox'
    },
    itemActiveClass: 'active'
  }

  function init(){
    $( config.selector.container ).each(function(i, sumContainer){
      var $sumContainer = $(this)
          $sumContainer = $(sumContainer);
      $sumContainer.find(config.selector.item).each(function(i, itemSum){
        var $itemSum = $(itemSum);
        heightAdjust($itemSum);
        selectItem($sumContainer, $itemSum);
      });
    })
  }

  function heightAdjust($itemSum){
      $itemSum.children('span').height( $itemSum.height() -20 )
      $itemSum.children('.sumValue').css( 'line-height' , $itemSum.height() -20 + 'px' );
  }

  function selectItem ($sumContainer, $item) {
    $item.find( config.selector.elemTrigger ).on('change', function(evt){
      var $itemSum = $(this).parents(config.selector.item),
          $input = $(this);
      $('[name="' + $input.attr('name') + '"]', $sumContainer ).parents(config.selector.item).removeClass(config.itemActiveClass);
      $itemSum.toggleClass(config.itemActiveClass, $input.prop('checked') );

    });
  }

  return {
    init: init
  };

}());
