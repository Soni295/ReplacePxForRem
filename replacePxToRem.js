const { opendir } = require('fs/promises')
const fs = require('fs')
const PATH = require('path')

// don't check all directorys in this array is case sensitive
const dontPass = ['dontpass', 'dontpass2', 'nodemodules']

// RegExp obj for filtler
const REGEX = {
  cssExt : /[^2].css$/,
  withExt : /.*\..*/,
  unitPx: /.*px/,
  newExt: /.{4}$/
}

// checks for files
const isCssFile = name => REGEX.cssExt.test(name)
const withoutAccess = name => !dontPass.some(dir => dir === name)
const dontHasExt = name => !REGEX.withExt.test(name)
const isDir = name => withoutAccess(name) && dontHasExt(name)
const doSelfHasPx = name => REGEX.unitPx.test(name)
const changeLine = text => doSelfHasPx(text)
  ? text.replace(/[0-9]*px/g, L => L.replace(/px/, '')/ 16 +'rem')
  : text


const changePxToRem = async(path) => {
  const newCss = path.replace(REGEX.newExt, '2.css')
  const read = fs.createReadStream(path, {encoding: 'utf-8'} )
  const write = fs.createWriteStream(newCss)

  read.on('data', chuck => {
    lines = chuck.split('\n')

    for(let line of lines) {
      line = changeLine(line)
      write.write(line + '\n')
    }
  })
}

const action = (nameFile, path) => {
  if(isDir(nameFile)){
    searchFile(PATH.join(path, nameFile))
  } else if(isCssFile(nameFile)){
    changePxToRem(PATH.join(path, nameFile))
  }
}

const searchFile = async path => {
  try {
    const directory = await opendir(path)
    for await(const { name } of directory) action(name, path)
  }
  catch(err) {} // this error is if the file isn't directory
}

searchFile(__dirname)
