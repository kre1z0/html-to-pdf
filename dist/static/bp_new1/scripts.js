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

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function getPageHtml(title, details) {
        return "<h1>"+ title +"<span class='page-title-details'> "+ details +"</span></h1>" +
            "<p class='footer-label'>Федеральная корпорация по развитию малого и среднего предпринимательства</p>" +
            "<p class='footer-label page-number'>№</p>"
    }

    var slice = function(elements, start, end) {
        var sliced = Array.prototype.slice.call(elements, start, end);
        return sliced;
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

    function ceilHeight(block) {
        block.style.height = Math.ceil(block.offsetHeight) + 'px';
    }

    function continueTable(
        selector,
        maxHeight,
        amountsHeaderRows,
        paddings
    ) {
        var blockWithoutContent = document.querySelector(selector);
        maxHeight =  maxHeight - paddings;

        if (blockWithoutContent.offsetHeight > maxHeight) {
            var rows = blockWithoutContent.querySelectorAll('tr');

            for (var i = amountsHeaderRows; i < rows.length; i++) {
                blockWithoutContent.querySelector('tbody').removeChild(rows[i]);
            }

            var cloneBlock = blockWithoutContent.parentElement.cloneNode(true);
            insertAfter(cloneBlock, blockWithoutContent.parentElement);

            var mutableBlock = cloneBlock.querySelector(selector);

            for (var j = amountsHeaderRows; j < rows.length; j++) {
                if (mutableBlock.offsetHeight + rows[j].offsetHeight > maxHeight) {
                    var cloneBlock = blockWithoutContent.parentElement.cloneNode(true);
                    insertAfter(cloneBlock, mutableBlock.parentElement);
                    mutableBlock = cloneBlock.querySelector(selector);
                };
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

    function tttttt(
        selector,
        maxHeight,
        amountsHeaderRows,
        paddings,
        countRows
    ) {
        var block = document.querySelector(selector);

        if (block.offsetHeight > maxHeight) {
            var rows = block.querySelectorAll('tr');

            var headersRowsHeight = 0;
            for (var i = 0; i < amountsHeaderRows; i++) {
                headersRowsHeight  = headersRowsHeight  + rows[i].offsetHeight;
            }

            var height = headersRowsHeight ;
            var rows = block.querySelectorAll('tr');
            var array = [];
            var index = amountsHeaderRows;

            for (var i = amountsHeaderRows; i < rows.length; i++) {
                if (height + rows[i].offsetHeight  > maxHeight - paddings) {
                    array.push(slice(rows, index, i));
                    index = i;
                    height = headersRowsHeight ;
                }
                height = height + rows[i].offsetHeight;

            }

            array.push(slice(rows, index, rows.length));

            for (var i = amountsHeaderRows; i < rows.length; i++) {
                block.querySelector('tbody').removeChild(rows[i]);
            }
            for (var i = 0; i < array.length - 1; i++) {
                var cloneBlock = block.parentElement.cloneNode(true);
                insertAfter(cloneBlock, block.parentElement);
            }
            var blocks = document.querySelectorAll("." + block.className);

            for (var i = 0; i < blocks.length; i++) {
                var pageNumber = i + 1;
                var spanPageNumber = blocks[i].parentElement.querySelector('.header-page-number');
                spanPageNumber.innerHTML = pageNumber + " из " + blocks.length;

                if(countRows) {
                    var pageNumber = i + 1;
                    var spanPageNumber = blocks[i].parentElement.querySelector('.header-page-number');
                    var competitorsCount = blocks[i].parentElement.querySelector('.market-environment-count');
                    competitorsCount.innerHTML = rows.length - amountsHeaderRows;
                }

                for (var j = 0; j < array[i].length; j++) {
                    blocks[i].querySelector('tbody').appendChild(array[i][j]);
                }
            }
        }
    }
    /*-------------1. Резюме. Укрупненный график мероприятий--------------------*/
    continueTable('.summary-schedule-activities', 497, 2, 25);
    ///*-------------2. Анализ рынка. Конкурентная среда--------------------*/
    //continueTable('.market-environment-block', 497, 2, 55, true);
    /*-----------6. Инвестиционная программа. График финансирования----------*/
    continueTable('.investment-program-financing-schedule', 497, 3, 25);

    /*-------------------------------------page-number-------------------------------------*/
    (function () {
        var pages = document.querySelectorAll('.page-number');
        for (var i = 0; i < pages.length; i++) {
            pages[i].innerHTML = i + 2;
        }
    })();
})();



