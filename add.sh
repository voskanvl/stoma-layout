#!/usr/bin/bash
echo ".$1" > "./src/pug/blocks/index/$1.pug"
echo ".$1" > "./src/style/_$1.sass"
echo -e "\n@import \"./_$1\"" >> ./src/style/_imports.sass
echo -e "\nsection.$1__container\n\tinclude ./blocks/index/$1.pug" >> ./src/pug/index.pug
