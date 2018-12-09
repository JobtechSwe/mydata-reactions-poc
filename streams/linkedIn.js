const { timer } = require('rxjs')
const { map } = require('rxjs/operators')

const professions = ['carpenter', 'CNC-operator', 'Java-programmer', 'Project Manager', 'Economy', 'Data Scientist']
const educations = ['Economy', 'Programming', 'Engineer', 'Data Science', 'University']

/* simulate changes in LinkedIn */
module.exports = timer(0, 10000).pipe(
  map(() => ({
    experience: {
      years: Math.round(Math.random() * 5),
      profession: professions[Math.round(Math.random() * professions.length)]
    },
    education: {
      startingYear: 1995 + Math.round(Math.random() * 20),
      education: educations[Math.round(Math.random() * educations.length)],
      years: Math.round(Math.random() * 5)
    },
    user: {
      id: 1337,
      name: 'foo bar'
    }
  }))
)
