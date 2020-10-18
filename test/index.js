console.time('test')

require('@babel/register')({
  presets: [
    [
      '@babel/preset-react',
      {
        pragma: 'h',
        pragmaFrag: 'h'
      }
    ]
  ]
})

const test = require('baretest')('hypobox')
const assert = require('assert')

require('./hyposcript')(test, assert)
;(async function () {
  await test.run()
  console.timeEnd('test')
})()
