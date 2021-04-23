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
  withExt : /.*\..*/
}



const dontPass = ['dontpass']

const searchFile = async path => {
  try {
    const directory = await opendir(path);
    for await(const { name } of directory) {
      switch(true) {
        case REGEX.cssExt.test(name):
          console.log(`I\'m a css file`,name)
          break
        case REGEX.withExt.test(name):
          console.log(`I\'m not a css file`, name)
          break
        case dontPass.some( dir => dir ===name):
          console.log(`Sorry, this directory, doesn't works`, name)
          break
        default:
            console.log('Maybe i\'m a directory', name)
            searchFile(`${path}/${name}`)
          break
      }
    }
  }
  catch(err){
    console.log('I\'m not a directory', path.replace(/.*\//, ''))
  }
}

/*

*/

searchFile('./')



console.log(dontPass.some(item => item == ''))
