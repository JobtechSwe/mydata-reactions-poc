const crypto = require('crypto')

class HashStorage {
  constructor (storage) {
    this.storage = storage
  }
  hash (value) {
    const hash = crypto.createHash('SHA256')
    const data = JSON.stringify(value)
    hash.update(data)
    return hash.digest('hex')
  }
  async set (scope, key, value) {
    const prev = await this.get(scope, key)
    const hash = this.hash(value)
    const obj = {...value, hash, prevHash: prev && prev.hash || null}
    if (prev && prev.hash === hash) return Promise.resolve() // don't save same object more than once
    this.storage.set(`${scope}/${key}`, obj)
    return Promise.resolve(obj)
  }
  get (scope, key) {
    return Promise.resolve(this.storage.get(`${scope}/${key}`))
  }
}
module.exports = new HashStorage(new Map())
