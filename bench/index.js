const { Suite } = require('benchmark')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const hyposcript = require('../')

function bench(name) {
	console.log(`\n# ${name}`);
	const suite = new Suite();
	const previous = suite.add.bind(suite);
	suite.on('cycle', e => console.log('  ' + e.target));
	suite.add = (name, runner) => previous(name.padEnd(16), runner);
	return suite;
}

function createApp(h) {
  return h('div', { className: 'foo' },
    h('ul', {},
      h('li', {}, 'a'),
      h('li', {}, 'a'),
      h('li', {}, 'a'),
      h('li', {}, 'a'),
      h('li', {}, 'a'),
      h('li', {}, 'a'),
      h('li', {}, 'a'),
      h('li', {}, 'a'),
    )
  )
}

bench('render')
  .add('react', () => {
    renderToStaticMarkup(createApp(React.createElement))
  })
  .add('hyposcript', () => {
    renderToStaticMarkup(createApp(hyposcript.h))
  })
  .run()
