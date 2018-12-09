/* eslint-env jest */
const Pipe = require('../lib/Pipe')
const { from } = require('rxjs')

describe('pipeline', () => {
  test('constructor', () => {
    const storage = {
      get: () => ({}),
      set: () => ({})
    }

    const pipe = new Pipe(storage)
    expect(pipe).toHaveProperty('pipe')
  })

  test('pipe returns an observable', () => {
    const storage = {
      get: () => ({}),
      set: () => ({})
    }

    const userPipe = new Pipe(storage)
    const stream = from([])
    const result = userPipe.pipe(stream, value => value)
    expect(result).toHaveProperty('subscribe')
  })

  test('scopes are called correctly', (done) => {
    const storage = {
      get: jest.fn((scope, id) => Promise.resolve({id: id, scope})),
      set: jest.fn((scope, id, value) => {
        return Promise.resolve({...value, id, scope})
      })
    }
    const uberDrive = from([{id: 111}])

    const pipeline = new Pipe(storage, 'user')
    const results = pipeline.pipe(
      uberDrive,
      uberDrive => uberDrive,
      (user, drive) => ({...user, drive})
    )

    results.subscribe(obj => {
      expect(obj).toEqual({id: 111, drive: { id: 111 }, scope: 'user'})
      expect(storage.get).toBeCalledWith('user', 111)
      expect(storage.set).toBeCalledWith('user', 111, {id: 111, drive: { id: 111 }, scope: 'user'})
      done()
    })
  })

  test('mapper and reducers work properly', (done) => {
    const storage = {
      get: jest.fn((scope, id) => {
        expect(scope).toEqual('user')
        return Promise.resolve({id: id})
      }),
      set: jest.fn((scope, id, value) => {
        expect(scope).toEqual('user')
        expect(id).toEqual(1337)
        return Promise.resolve(value)
      })
    }
    const uberDrive = from([{id: 111, driver: {id: 1337}}])

    const pipeline = new Pipe(storage, 'user')
    const results = pipeline.pipe(
      uberDrive,
      // map
      uberDrive => ({ id: uberDrive.driver.id, driveId: uberDrive.id }),
      // reduce
      (user, drive) => ({id: user.id, latestDriveId: drive.driveId})
    )

    results.subscribe(obj => {
      expect(obj).toEqual({id: 1337, latestDriveId: 111})
      expect(storage.get).toBeCalledWith('user', 1337)
      expect(storage.set).toBeCalledWith('user', 1337, {id: 1337, latestDriveId: 111})
      done()
    })
  })
})
