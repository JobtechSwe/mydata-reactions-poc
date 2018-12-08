const reactions = require('../reactions')

test('basic transformation', () => {
  const drive = {
    id: 1,
    rating: 1
  }
  const gig = {
    id: 1337,
    drives: 4,
    rating: 4.4
  }

  const expected = {
    id: 1337,
    drives: 5,
    rating: 3.72
  }

  const result = reactions.gigFromDrive(gig, drive)
  expect(result).toEqual(expected)
})
