const streams = require('./streams')
const reactions = require('./reactions')
const storage = require('./storage')
const { map, switchMap, filter } = require('rxjs/operators')

streams.uberDrives.pipe(
  // load previous user object
  switchMap(drive => storage.get('user', drive.driver.id).then(user => ({user: user || {id: drive.driver.id, gig: {}}, drive}))),

  // send it to all subscribers
  map(({user, drive}) => ({...user, gig: reactions.gigFromDrive(user.gig, drive)})),

  // save the new object
  switchMap(user => storage.set('user', user.id, user)),

  // only keep emit users that were changed
  filter(user => user)
).subscribe(user => {
  console.log('user', user)
})
