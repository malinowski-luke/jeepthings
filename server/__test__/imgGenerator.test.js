const imgGenerator = require('../utils/imgGenerator')

test('imgGenerator should return a string matching url regex', () => {
  expect(imgGenerator()).toEqual(
    expect.stringMatching(/https:\/\/robohash.org\//)
  )
})

test('imgGenerator should return a string with a length greater than', () => {
  expect(imgGenerator().length).toBeGreaterThan(21)
})
