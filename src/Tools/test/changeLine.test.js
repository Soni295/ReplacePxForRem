const { changeLine } = require('../index')

class Test{
  constructor(example, response){
    this.example = example
    this.response = response
  }
}

const examples = [
  new Test(
    'border: solid 16px red;',
    'border: solid 1rem red;'
  ),
  new Test(
    `div {
       display: grid;
       border-radius: 10px 20px 30px 15px;
       background-color: blue;
       grid-template-columns: repeat(3, 30px);
     }`,
    `div {
       display: grid;
       border-radius: 0.625rem 1.25rem 1.875rem 0.9375rem;
       background-color: blue;
       grid-template-columns: repeat(3, 1.875rem);
     }`
  ),
  new Test(
    `.m-px {
       display: flex;
       box-sizing: border-box;
       padding: 5000px;
       margin: 20px;
     }`,
    `.m-px {
       display: flex;
       box-sizing: border-box;
       padding: 312.5rem;
       margin: 1.25rem;
     }`
  ),
  new Test(
    `#npx {
       border: 2px red solid;
     }`,
    `#npx {
       border: 0.125rem red solid;
     }`
  )
]

for(const {example, response} of examples){
  test(`${example} -> ${response}`, () => {
    expect(changeLine(example)).toBe(response)
  })
}
