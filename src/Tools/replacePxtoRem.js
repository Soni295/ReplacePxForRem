const fs = require('fs')
const PATH = require('path')

const { isCssFile, isDir, changeLine, REGEX } = require('./replacePxToRem/Tools')

const config = {
  'backUp': true, // created a file without change it name is name-back-up.css
  'undo': false // if exist back-up undo all change
}

// don't check all directorys in this array is case sensitive
const dontPass = ['dontpass', 'dontpass2', 'nodemodules']

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

const searchFile = async (path=__dirname) => {
  try{
    const directory = fs.readdirSync(path)
    for (const name of directory) action(name, path)
  }
  catch(err) {}
}

searchFile()
module.exports = {
  searchFile,
  action
}
