const { Suite } = require('benchmark')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const hyperscript = require('hyperscript')
const vhtml = require('vhtml')
const hyposcript = require('../')

function bench (name) {
  console.log(`\n# ${name}`)
  const suite = new Suite()
  const previous = suite.add.bind(suite)
  suite.on('cycle', e => console.log('  ' + e.target))
  suite.add = (name, runner) => previous(name.padEnd(16), runner)
  return suite
}

function createApp (h) {
  return h(
    'div',
    { className: 'foo' },
    h(
      'ul',
      {},
      h('li', { style: { color: 'blue' } }, 'a'),
      h('li', { htmlFor: 'input' }, 'b'),
      h('li', {}, 'c'),
      h('li', {}, 'd'),
      h('li', {}, 'e'),
      h('li', {}, 'f'),
      h('li', {}, 'g'),
      h('li', {}, 'h')
    )
  )
}

bench('render')
  .add('hyperscript', () => {
    createApp(hyperscript).outerHTML
  })
  .add('react', () => {
    renderToStaticMarkup(createApp(React.createElement))
  })
  .add('vhtml', () => {
    createApp(vhtml)
  })
  .add('hyposcript', () => {
    createApp(hyposcript.h)
  })
  .run()
