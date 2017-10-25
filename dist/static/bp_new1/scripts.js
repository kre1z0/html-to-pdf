/**
 * Created by kreizo on 11.10.2017.
 */
(function() {
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    function getAbsoluteHeight(el) {
        // Get the DOM Node if you pass in a string
        el = (typeof el === 'string') ? document.querySelector(el) : el;

        var styles = window.getComputedStyle(el);
        var margin = parseFloat(styles['marginTop']) +
            parseFloat(styles['marginBottom']);

        return Math.ceil(el.offsetHeight + margin);
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function controlHeight(block_one, block_two) {
        var blockOne = document.querySelector(block_one),
            blockTwo = document.querySelector(block_two);

        blockTwo.style.height = Math.ceil(blockTwo.offsetHeight) + 'px';
        blockOne.style.height = Math.ceil(blockOne.offsetHeight) + 'px';

        if (blockOne.offsetHeight < blockTwo.offsetHeight) {
            blockOne.style.height = blockTwo.offsetHeight + 'px';
        } else {
            blockTwo.style.height = blockOne.offsetHeight + 'px';
        }
    }

    function continueTable(selector, maxHeight, amountsHeaderRows, amountItemsSelector) {
        var blockWithoutContent = document.querySelector(selector);

        if (getAbsoluteHeight(blockWithoutContent) > maxHeight) {
            var rows = blockWithoutContent.querySelectorAll('tr');

            if(amountItemsSelector) {
                var competitorsCount = blockWithoutContent.parentElement.querySelector(amountItemsSelector);
                competitorsCount.innerHTML = rows.length - amountsHeaderRows;
            }

            for (var i = amountsHeaderRows; i < rows.length; i++) {
                blockWithoutContent.querySelector('tbody').removeChild(rows[i]);
            }

            var cloneBlock = blockWithoutContent.parentElement.cloneNode(true);
            insertAfter(cloneBlock, blockWithoutContent.parentElement);

            mutableBlock = cloneBlock.querySelector(selector);

            for (var j = amountsHeaderRows; j < rows.length; j++) {
                if (getAbsoluteHeight(mutableBlock) > maxHeight) {
                    var cloneBlock = blockWithoutContent.parentElement.cloneNode(true);
                    insertAfter(cloneBlock, mutableBlock.parentElement);
                    mutableBlock = cloneBlock.querySelector(selector);
                    mutableBlock.querySelector('tbody').appendChild(rows[j - 1]);
                }
                mutableBlock.querySelector('tbody').appendChild(rows[j]);
            }

            blockWithoutContent.parentElement.remove();

            var allBlocks = document.querySelectorAll(selector);
            for (var k = 0; k < allBlocks.length; k++) {
                var pageNumber = k + 1;
                var spanPageNumber = allBlocks[k].parentElement.querySelector('.header-page-number');
                spanPageNumber.innerHTML = pageNumber + " из " + allBlocks.length;
            }
        }
    }

    var blockMaxHeight = 497;
    /*-------------1. Резюме. Укрупненный график мероприятий--------------------*/
    continueTable('.summary-schedule-activities', blockMaxHeight, 2);
    /*-------------2. Анализ рынка. Конкурентная среда--------------------*/
    continueTable('.market-environment-block', blockMaxHeight, 2, '.market-environment-count');
    /*-----------6. Инвестиционная программа. График финансирования----------*/
    continueTable('.investment-program-financing-schedule', blockMaxHeight, 3);

    /*-------------------------------------page-numbers-------------------------------------*/
    (function () {
        var pages = document.querySelectorAll('.page-number');
        for (var i = 0; i < pages.length; i++) {
            pages[i].innerHTML = i + 1;
        }
    })();
})();
