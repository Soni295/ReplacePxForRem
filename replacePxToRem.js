//import { opendir } from 'fs/promises';
const { opendir } = require('fs/promises')
const fs = require('fs')
const PATH = require('path')

const REGEX = {
  cssExt : /.*.css/,
  withExt : /.*\..*/,
  unitPx: /.*px/
}

const escritor = async(path) => {

  const read = fs.createReadStream(PATH.join(__dirname, path), {encoding: 'utf-8'} )

  read.on('data', chuck => {

    lines = chuck.split('\n')
    for(const line of lines){
      if(REGEX.unitPx.test(line)) {
        const rem = line.replace(/.{1,3}px/g, L =>
          ' ' + L.replace(/px/, '')/ 16 +'rem'
        )
        console.log(line, '<- before')
        console.log(rem, '<- after')
      }
    }

  })
}

// escritor('./example/main.css')


const dontPass = ['dontpass']

const searchFile = async path => {
  try {
    const directory = await opendir(path);
    for await(const { name } of directory) {
      switch(true) {
        case REGEX.cssExt.test(name):
          console.log(`I\'m a css file ---> `,name)
          break
        case REGEX.withExt.test(name):
          console.log(`I\'m not a css file --->`, name)
          break
        case dontPass.some( dir => dir ===name):
          console.log(`Sorry, don't have allow for this directory ---->`, name)
          break
        default:
            console.log('Maybe i\'m a directory --->', name)
            searchFile(`${path}/${name}`)
          break
      }
    }
  }
  catch(err){
    console.log('I\'m not a directory', path.replace(/.*\//, ''))
  }
}

searchFile('./')
