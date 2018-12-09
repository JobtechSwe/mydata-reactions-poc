const streams = require('./streams')
const storage = require('./storage')
const { userFromUberDrive, userFromLinkedIn } = require('./reactions')
const { merge } = require('rxjs')
const Pipe = require('./lib/Pipe')

const userPipeline = new Pipe(storage, 'user', 'id')

merge(
  userPipeline.pipe(streams.uberDrive, userFromUberDrive.map, userFromUberDrive.reduce),
  userPipeline.pipe(streams.linkedIn, userFromLinkedIn.map, userFromLinkedIn.reduce)
).subscribe(user => {
  console.log('updatedUser', user)
  /*const history = await storage.getHistory(user.hash)
  console.log('history', history)*/
})
