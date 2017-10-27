`yarn start` - command to start the development environment with a hot reload
`yarn build` - command for minify css and js (**use only after yarn start**)

**arguments of the continueTable function**
1. `selector` - selector of the parent table block
2. `maxHeight` - the maximum height for the selector of the parent table block for moving the table to the next page
3. `amountsHeaderRows` - number of rows of the table header to be moved to the next page
4. `amountItemsSelector` - selector for the number of rows without a headers rows 


**arguments of the continueBlock function**
1. `selector` - selector of the parent block
2. `maxHeight` - the maximum height for the selector of the parent block for moving the block to the next page
3. `indexBlocksDontFullWidth` - array with block indexes that do not need to be stretched to the full width of the parent block
