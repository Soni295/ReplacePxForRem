<h1 style="text-align: center;">Replace Px to Rem</h1>

It is a script that I develop so that when it is executed it will recursively change in all the ".css" files the values expressed in px to rem with their equivalent in 1rem: 16px.

First install the repository and its dependencies:
```sh
$ git clone https://github.com/Soni295/ReplacePxForRem/
$ cd ReplacePxForRem
$ npm i
```
Then check that the tests works well
```sh
$ npm run test
```
if you want to check how it works, change directory for ```src``` and copy ```index.js``` in example
```sh
$ cd src
$ cp replacePxtoRem.js example
$ cd example/css
```
then see css files inside
```sh
$ cd example/css
```

then run index.js and compare
```sh
$ cd ..
$ node replacePxtoRem.js
$ cd css
```
