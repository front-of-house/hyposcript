console.time('test')

require('@babel/register')({
  presets: [
    [
      '@babel/preset-react',
      {
        pragma: 'h'
      }
    ]
  ]
})

const test = require('baretest')('presta')
const assert = require('assert')

require('./test/index.js')(test, assert)

!(async function () {
  await test.run()
  console.timeEnd('test')
})()
