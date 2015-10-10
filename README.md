# Promisify

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Transforms a callback-based function into a Promise. A user can optionally provide their own callback function. If provided, use `this.resolve()` and `this.reject()` within the callback.


## Install

```sh
npm i --save @urban/promisify
```


## Example

```sh
import fs from 'fs'
import promisify from '@urban/promisify'

const stat = promisify(fs.stat)

stat('file.txt')
  .then(stat => {
    console.log('File Stat', stat)
  })
  .catch(err => {
    // Error - could not `stat` file.
  })

// With custom callback.
const fileExists = promisify(fs.stat, function (err, result) {
  this.resolve(err === null)
})

fileExists('file.txt')
  .then(exists => {
    console.log('File exists', exists)
  })
```


## License

[The MIT License (MIT)](LICENSE). Copyright (c) [Urban Faubion](http://urbanfaubion.com).
