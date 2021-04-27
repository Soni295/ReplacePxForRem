const fs = require('fs')
const PATH = require('path')

// don't check all directorys in this array is case sensitive
const dontPass = ['dontpass', 'dontpass2', 'nodemodules']

// RegExp obj for filtler
const REGEX = {
  cssExt : /.*\.css/,
  isTemp : /temp/,
  withExt: /.*\..*/,
  unitPx: /.*px/,
  newExt: /.{4}$/
}

// match only '.css'
const isCssFile = text => REGEX.cssExt.test(text) &&
  !REGEX.isTemp.test(text)

// check in a array dir which can't access
const withoutAccess = (text, arr) => !arr.find(dir => dir === text)
// check if file has extestion
const dontHasExt = text => !REGEX.withExt.test(text)
// check if is a file
const isDir = (text, arr) => withoutAccess(text, arr) && dontHasExt(text)

// check if the text has 'px'
const doSelfHasPx = text => REGEX.unitPx.test(text)
// change all px for rem
const changeLine = text => doSelfHasPx(text)
  ? text.replace(/\d+px/g, L => L.replace(/px/, '')/ 16 +'rem')
  : text

const changePxToRem = path => {
  // first change original file name example 'main.css' for 'main.css-back-up'
  const newBackUp = path.replace(REGEX.newExt, '-back-up.css')
  fs.renameSync(path, newBackUp)
  const read = fs.createReadStream(newBackUp, {encoding: 'utf-8'} )

  // then create a new file use to reference the original example
  // 'main.css' for 'maintemp.css'
  const newCss = path.replace(REGEX.newExt, 'temp.css')
  const write = fs.createWriteStream(newCss)
  read.on('data', chuck =>  write.write(changeLine(chuck)))

  read.on('end', () => {
    fs.renameSync(newCss, path)
    fs.unlinkSync(newBackUp)
  })
}

const action = (nameFile, path) => {
  if(isDir(nameFile, dontPass)) {
    searchFile(PATH.join(path, nameFile))
  }else if(isCssFile(nameFile)) {
    changePxToRem(PATH.join(path, nameFile))
  }
}

const searchFile = (path=__dirname) => {
  try{
    const directory = fs.readdirSync(path)
    for (const name of directory) action(name, path)
  }
  catch(err) {}
}

searchFile()
