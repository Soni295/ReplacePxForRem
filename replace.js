//import { opendir } from 'fs/promises';
const {opendir} = require('fs/promises')
const fs = require('fs')

const escritor = async(path) => {
  const read = fs.createReadStream(path, {encoding: 'utf-8'} )
  read.on('data', chuck => {
    renglones = chuck.split('\n')
    for(const renglon of renglones){
      if(/.*px/.test(renglon)) {
        const rem = renglon.replace(/.{1,3}px/g, L =>
          ' ' + L.replace(/px/, '')/ 16 +'rem'
        )
        console.log(rem)
      }
    }

  })
}

//escritor('./main.css')

const REGEX = {
  cssExt : /.*.css/,
  withOutExt : /.*\..*/
}


const searchFile = async path => {
  const directory = await opendir(path);
  for await(const {name }of directory) {
    switch(true) {
      case REGEX.cssExt.test(name):
        console.log('I\'m css file',name)
        break
      case REGEX.withOutExt.test(name):
        console.log('I\'m not css file', name)
        break
      default:
        console.log('Maybe I\'m directory', name)
        break
    }
  }
}
searchFile('./')
