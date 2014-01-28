Locastyle.prototype.sumValues = (function() {
  'use strict';

  var config = {
    selector: {
      container: '.ls-sum-values-container',
      item: '.sumItem',
      elemTrigger: ':radio, :checkbox',
      sumTotal: '.sumResumeTotal',
      sumText: '.sumResumeText'
    },
    itemActiveClass: 'active',
    defaultText: 'Nenhuma opção selecionada',
    textLabelSeparator: ' + '
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
      $sumContainer.find(config.selector.elemTrigger).eq(0).trigger('change');
    });
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
      sumItens($sumContainer);
    });
  }

  function sumItens($sumContainer){
    var total = 0,
        text = '';
    $sumContainer.find(':checked').each(function(i, item){
      total += $(item).data('sumvalue');
      text += ( i > 0 ? config.textLabelSeparator: '') + $(item).data('sumlabel');
    });
    var $sumTotal = $(config.selector.sumTotal, $sumContainer);
    var totalPattern = $sumTotal.data('sumpattern');
    $sumTotal.text(totalPattern.replace(/\{\{val\}\}/, total));
    $(config.selector.sumText, $sumContainer).text( text === '' ? config.defaultText : text );
  }

  return {
    init: init
  };

}());
