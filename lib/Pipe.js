const { switchMap } = require('rxjs/operators')

class Pipe {
  constructor (storage, scope, key = 'id') {
    this.storage = storage
    this.scope = scope
    this.key = key
  }

  pipe (stream, mapper, reducer) {
    return stream.pipe(
      // extract the target id
      switchMap(mapper),

      // load the previous target object
      switchMap(mapped => this.storage.get(this.scope, mapped.id).then(stored => ([stored, mapped]))),

      // reduce the previous object with the new mapped object
      switchMap(([stored, mapped]) => reducer(stored, mapped)),

      // store the result in storage
      switchMap(target => this.storage.set(this.scope, target[this.key], target)),
    )
  }
}

module.exports = Pipe
