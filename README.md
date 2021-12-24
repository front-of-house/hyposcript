# hyposcript

[![npm version](https://img.shields.io/npm/v/hyposcript?style=flat&colorA=4488FF&colorB=4488FF)](https://www.npmjs.com/package/hyposcript) [![test coverage](https://img.shields.io/coveralls/github/sure-thing/hyposcript?style=flat&colorA=223355&colorB=223355)](https://coveralls.io/github/sure-thing/hyposcript?branch=main) [![npm bundle size](https://badgen.net/bundlephobia/min/hyposcript?color=223355&labelColor=223355)](https://bundlephobia.com/result?p=hyposcript)

Hyper minimal hyperscript for server rendering.

```
npm i hyposcript
```

## Usage

Hyposcript has essentially the same API as
[hyperscript](https://github.com/hyperhype/hyperscript) or
[React.createElement](https://reactjs.org/docs/react-without-jsx.html), so it
should feel familiar.

The difference is: no DOM, only strings.

```js
const { h } = require('hyposcript')

h('button', { class: 'btn' }, 'Click me!')

// => <button class="btn">Click me!</button>
```

### JSX

To use with JSX you'll need to transpile or use a runtime.

For example, if you're using `babel`, your config should probably look something
link this:

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "pragma": "h",
        "pragmaFrag": "h"
      }
    ]
  ]
}
```

### Benchmarks

Since `hyposcript` is basically just concatenating strings, benchmark
comparisons with `hyperscript` or `react` are not really fair. And though
`vhtml` and `hyposcript` are essentially the same, `hyposcript` does not escape
HTML strings for you (be safe out there). Even so, there's a simple benchmark
here for general reference. These were run on an 2.4 GHz 8-Core Intel Core i9
MacBook Pro.

```
hyperscript      x 27,932 ops/sec ±2.08% (89 runs sampled)
react            x 43,261 ops/sec ±0.63% (94 runs sampled)
vhtml            x 168,688 ops/sec ±0.67% (91 runs sampled)
hyposcript       x 444,603 ops/sec ±1.07% (89 runs sampled)
```

### License

MIT License © [Sure Thing](https://github.com/sure-thing)
