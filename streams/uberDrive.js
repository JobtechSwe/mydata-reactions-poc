const { timer } = require('rxjs')
const { map } = require('rxjs/operators')

/* simulate drives */
module.exports = timer(0, 1000).pipe(
  map(() => ({
    rating: Math.round(Math.random() * 5),
    from: null,
    to: null,
    date: new Date().toISOString(),
    driver: {
      id: 1337,
      name: 'foo bar'
    }
  }))
)
