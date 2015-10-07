import test from 'tape'

import fs from 'fs'
import {join} from 'path'
import promisify from '../'

const testFilename = join(__dirname, './fixtures/file.txt')

test('It works.', async assert => {
  assert.plan(1)
  try {
    const fileStatPromise = promisify(fs.stat)
    const stats = await fileStatPromise(testFilename)
    assert.notEqual(stats, undefined, 'Success.')
  } catch (err) {
    console.log(err)
  }
})

test('It should allow custom callback.', async assert => {
  assert.plan(1)
  try {
    const fileExistsPromise = promisify(fs.stat, function (err, result) {
      this.resolve(err === null)
    })
    assert.equal(await fileExistsPromise(testFilename), true, 'Has custom callback.')
  } catch (err) {
    console.log(err)
  }
})
