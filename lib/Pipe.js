const { map, switchMap, tap } = require('rxjs/operators')

class Pipe {
  constructor (storage, scope) {
    this.storage = storage
    this.scope = scope
  }

  pipe (stream, mapper, reducer) {
    return stream.pipe(
      // extract the target id
      map(mapper),

      // load the previous target object
      switchMap(mapped => this.storage.get(this.scope, mapped.id).then(stored => ([stored, mapped]))),
      tap(saved => console.log('saved', saved)),
      // reduce the previous object with the new mapped object
      map(([stored, mapped]) => reducer(stored, mapped)),

      // store the result in storage
      switchMap(target => this.storage.set(this.scope, target.id, target)),
    )
  }
}

module.exports = Pipe
