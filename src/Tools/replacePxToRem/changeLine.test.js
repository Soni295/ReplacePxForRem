const { changeLine } = require('./Tools')

const example1 = 'border: solid 16px red;'
const response1 = 'border: solid 1rem red;'
const example2 = `
div {
  display: grid;
  border-radius: 10px 20px 30px 15px;
  background-color: blue;
  grid-template-columns: repeat(3, 30px);
}
`
const response2 = `
div {
  display: grid;
  border-radius: 0.625rem 1.25rem 1.875rem 0.9375rem;
  background-color: blue;
  grid-template-columns: repeat(3, 1.875rem);
}
`
const example3 = `
.m-px {
  display: flex;
  box-sizing: border-box;
  padding: 5000px;
  margin: 20px;
}
`
const response3 = `
.m-px {
  display: flex;
  box-sizing: border-box;
  padding: 312.5rem;
  margin: 1.25rem;
}
`
const example4 = `
#npx {
  border: 2px red solid;
}
`
const response4 = `
#npx {
  border: 0.125rem red solid;
}
`
test(`${example1} -> ${response1}`, () => {
  expect(changeLine(example1)).toBe(response1)
})

test(`${example2} -> ${response2}`, () => {
  expect(changeLine(example2)).toBe(response2)
})
test(`${example3} -> ${response3}`, () => {
  expect(changeLine(example3)).toBe(response3)
})

test(`${example4} -> ${response4}`, () => {
  expect(changeLine(example4)).toBe(response4)
})
