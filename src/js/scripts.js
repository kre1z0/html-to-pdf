/**
 * Created by Kreizo on 11.10.2017.
 */

(function() {
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function lowCaseFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
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

        if (getAbsoluteHeight(blockOne) < getAbsoluteHeight(blockTwo)) {
            blockOne.style.height = blockTwo.offsetHeight + 'px';
        } else {
            blockTwo.style.height = blockOne.offsetHeight + 'px';
        }
    }

    function ceilHeight(block) {
        block.style.height = Math.ceil(block.offsetHeight) + 'px';
    }

    function ceilWidth(block) {
        block.style.width = Math.ceil(block.offsetHeight) + 'px';
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
                mutableBlock.querySelector('tbody').appendChild(rows[j]);
                if (getAbsoluteHeight(mutableBlock) > maxHeight) {
                    var cloneBlock = blockWithoutContent.parentElement.cloneNode(true);
                    insertAfter(cloneBlock, mutableBlock.parentElement);
                    mutableBlock = cloneBlock.querySelector(selector);
                    mutableBlock.querySelector('tbody').appendChild(rows[j]);
                }
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

    function continueBlock(selector, maxHeight) {
        var wrapper = document.querySelector(selector);
        var fullWidth = wrapper.offsetWidth;

        var blocks = wrapper.querySelectorAll('div');

        if (getAbsoluteHeight(wrapper) > maxHeight) {

            for (var i = 0; i < blocks.length; i++) {
                wrapper.removeChild(blocks[i]);
            }

            var cloneBlock = wrapper.parentElement.cloneNode(true);
            insertAfter(cloneBlock, wrapper.parentElement);

            mutableBlock = cloneBlock.querySelector(selector);

            for (var k = 0; k < blocks.length; k++) {
                blocks[k].style.width = 100 + '%';
                mutableBlock.appendChild(blocks[k]);

                if (getAbsoluteHeight(mutableBlock) > maxHeight) {
                    var cloneBlock = wrapper.parentElement.cloneNode(true);
                    insertAfter(cloneBlock, mutableBlock.parentElement);
                    mutableBlock = cloneBlock.querySelector(selector);
                    mutableBlock.appendChild(blocks[k]);
                };
            }

            wrapper.parentElement.remove();

            var cloneBlocks = document.querySelectorAll(selector);
            for (var j = 0; j < cloneBlocks.length; j++) {
                var blocks = cloneBlocks[j].querySelectorAll('div');

                var pageDetails = cloneBlocks[j].parentElement.querySelector('.page-title-details');
                var h2 = cloneBlocks[j].querySelectorAll('h2');

                var titles = [];

                for (var p = 0; p < h2.length; p++) {
                    titles.push(lowCaseFirstLetter(h2[p].textContent));
                }

                pageDetails.textContent = capitalizeFirstLetter(titles.join(', '));
            }
        } else {
            for (var n = 0; n < blocks.length; n++) {
                var number = n + 1;
                var prev = blocks[n - 1];
                var next = blocks[n + 1];
                if (
                    number & 1
                    && next
                    && blocks[n].offsetWidth !== fullWidth
                    && blocks.length === 4
                ) {
                    controlHeight('.' + blocks[n].className, '.' + next.className);
                } else if (
                    number & 1
                    && blocks.length === 3
                    && blocks[n].offsetWidth !== fullWidth
                    && prev
                    && prev.offsetWidth !== fullWidth
                ) {
                    controlHeight('.' + blocks[n].className, '.' + prev.className);
                }
            }
        }
    }

    var blockMaxHeight = 497;
    /*-------------1. Резюме. Местоположение, инвестиции, персонал--------------------*/
    continueBlock('.summary-location-investments-personnel', 505);
    /*-------------1. Резюме. Укрупненный график мероприятий--------------------*/
    continueTable('.summary-schedule-activities', blockMaxHeight, 2);
    /*-------------2. Анализ рынка. Конкурентная среда--------------------*/
    continueTable('.market-environment-block', blockMaxHeight, 2, '.market-environment-count');
    /*-----------6. Инвестиционная программа. График финансирования----------*/
    continueTable('.investment-program-financing-schedule', blockMaxHeight, 3);

    /*---------------------water marks-----------------------*/
    //(function () {
    //    var allBlocks = document.querySelectorAll('body > div');
    //    for (i = 0; i < allBlocks.length; i++) {
    //        var div = document.createElement('div');
    //        div.innerHTML = "<div>тестовая версия</div>";
    //        div.classList.add('water-mark');
    //        allBlocks[i].appendChild(div)
    //    }
    //})();

    /*---------------------page-numbers---------------------*/
    (function () {
        var pages = document.querySelectorAll('.page-number');
        for (var i = 0; i < pages.length; i++) {
            pages[i].innerHTML = i + 2;
        }
    })();
})();
