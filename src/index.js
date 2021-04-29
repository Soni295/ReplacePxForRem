const fs = require('fs')
const PATH = require('path')

// don't check all directorys in this array is case sensitive
const dontPass = ['dontpass', 'dontpass2', 'nodemodules']

// match only if it end on '.css' but not if end on 'temp.css' or
// '-back-up.css'
const isCssFile = text => /.*\.css/.test(text) && !/temp/.test(text) && !/-back-up/.test(text)

// check in a array dir which can't access
const withoutAccess = (text, dontPass) => !dontPass.includes(text)

// check if file has extestion
const hasExt = text => /.*\..*/.test(text)

// check if is a file
const isDir = (text, dontPass) => withoutAccess(text, dontPass) && !hasExt(text)

// change all px for rem
const changeLine = text => text.replace(/\d+px/g,
  L => L.replace(/px/, '')/ 16 +'rem'
)

const changePxToRem = path => {
  const filesPath = {
    'new': path.replace(/(.*)(\.css)/, '$1-temp$2'),
    'old': path.replace(/(.*)(\.css)/, '$1-back-up$2')
  }
  // first change original file name example 'main.css' for 'main.css-back-up'
  fs.renameSync(path, filesPath.old)
  const read = fs.createReadStream(filesPath.old, {encoding: 'utf-8'} )

  // then create a new file use to reference the original example
  // 'main.css' for 'maintemp.css'
  const write = fs.createWriteStream(filesPath.new)
  read.on('data', chuck => write.write(changeLine(chuck)))

  read.on('end', () => {
    fs.renameSync(filesPath.new, path)
    fs.unlinkSync(filesPath.old)
  })
}

const action = (nameFile, path) => {
  if(isDir(nameFile, dontPass)) {
    searchFile(PATH.join(path, nameFile))
  }
  else if(isCssFile(nameFile)) {
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
