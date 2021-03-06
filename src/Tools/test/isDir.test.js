const { isDir } = require('../index')

// if file doesn't exit in dontpass and doesn't has extention return true
// else return false
const dontPass = ['secret', 'js', 'build-css']

class Test{
  constructor(file, response){
    this.file = file
    this.response = response
  }
}
const examples = [
  new Test('index', true),
  new Test('index.html', false),
  new Test('css', true),
  new Test('style.css', false),
  new Test('main.css', false),
  new Test('index.css', false),
  new Test('build-css', false),
]

for(const {file, response} of examples){
  test(`if ${file} doesn't exist in | ${dontPass} | the result is ${response}`, () => {
    expect(isDir(file, dontPass)).toBe(response)
  })
}
