const { opendir } = require('fs/promises')
const { isCssFile, isDir, changeLine, REGEX } = require('./Tools')

const fs = require('fs')
const PATH = require('path')

const config = {
  'back-up': true, // created a file without change it name is name-back-up.css
  'undo': false // if exist back-up undo all change
}

// don't check all directorys in this array is case sensitive
const dontPass = ['dontpass', 'dontpass2', 'nodemodules']

const changePxToRem = async path => {
  const newCss = path.replace(REGEX.newExt, '2.css')

  const read = fs.createReadStream(path, {encoding: 'utf-8'} )
  const write = fs.createWriteStream(newCss)

  read.on('data', chuck =>  write.write(changeLine(chuck)))

  read.on('end' , () => {
    if(config['back-up']) {
      const backUpName = path.replace(REGEX.newExt, '-back-up.css')
      fs.rename(path, backUpName)
    }
  })
}

const action = (nameFile, path, debug=false) => {
  if(isDir(nameFile, dontPass)) {
    searchFile(PATH.join(path, nameFile), debug)
  } else if(isCssFile(nameFile)) {
    changePxToRem(PATH.join(path, nameFile))
  }
}

const searchFile = async (path=__dirname, debug=false) => {
  try {
    const directory = await opendir(path)
    for await(const { name } of directory) action(name, path, debug)
  }
  catch(err) {} // this error is if the file isn't directory
}

module.exports = searchFile
