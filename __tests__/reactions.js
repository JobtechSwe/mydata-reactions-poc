/* eslint-env jest */
const reactions = require('../reactions')

test('uber transformation', () => {
  const drive = {
    driver: {id: 1337},
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
  const mapped = reactions.userFromUberDrive.map(drive)
  expect(mapped).toEqual({id: 1337, rating: 1})

  const result = reactions.userFromUberDrive.reduce(user, mapped)
  expect(result).toEqual(expected)
})

