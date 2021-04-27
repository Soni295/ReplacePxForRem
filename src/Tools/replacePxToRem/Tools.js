// RegExp obj for filtler
const REGEX = {
  cssExt : /[^temp|\-back\-up]\.css$/ ,
  withExt : /.*\..*/,
  unitPx: /.*px/,
  newExt: /.{4}$/
}

// match only '.css'
const isCssFile = text => REGEX.cssExt.test(text)

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


module.exports = {
  isCssFile,
  isDir,
  REGEX,
  changeLine
}
