/* eslint-env jest */
const reactions = require('../reactions')

test('basic transformation', () => {
  const drive = {
    id: 1,
    rating: 1
  }
  const user = {
    id: 1337,
    gig: {
      drives: 4,
      rating: 4.4
    }
  }

  const expected = {
    id: 1337,
    gig: {
      drives: 5,
      rating: 3.72
    }
  }
  const result = reactions.userFromUberDrive(user, drive)
  expect(result).toEqual(expected)
})
