const { isCssFile } = require('./Tools')

// it has to end in .css then return true else false
class Test{
  constructor(file, response){
    this.file = file
    this.response = response
  }
}
const examples = [
  new Test('index.html', false),
  new Test('main.js', false),
  new Test('.git', false),
  new Test('.gitignore', false),
  new Test('node modules', false),
  new Test('index.css', true),
  new Test('main.css', true),
  new Test('style.css', true),
  new Test('main-temp.css', false),
  new Test('index-temp.css', false),
]

for(const {file, response} of examples){
  test(`if ${file} doesn't end in .css response false`, () => {
    expect(isCssFile(file)).toBe(response)
  })
}
