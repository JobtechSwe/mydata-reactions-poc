const streams = require('./streams')
const storage = require('./storage')
const { userFromUberDrive, userFromLinkedIn } = require('./reactions')
const Pipe = require('./lib/Pipe')

const userPipeline = new Pipe(storage, 'user')

userPipeline
  .pipe(streams.uberDrive, userFromUberDrive.map, userFromUberDrive.reduce)
  .subscribe(async user => {
    console.log('uberUpdatedUser', user)
    /*const history = await storage.getHistory(user.hash)
    console.log('history', history)*/
  })

userPipeline
  .pipe(streams.linkedIn, userFromLinkedIn.map, userFromLinkedIn.reduce)
  .subscribe(async user => {
    console.log('linkedInUpdatedUser', user)
    /*const history = await storage.getHistory(user.hash)
    console.log('history', history)*/
  })
