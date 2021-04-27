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
  new Test('maintemp.css', false),
  new Test('indextemp.css', false),
  new Test('main-back-up.css', false),
  new Test('index-back-up.css', false),
]

for(const {file, response} of examples){
  test(`if ${file} doesn't end in .css response false`, () => {
    expect(isCssFile(file)).toBe(response)
  })
}
