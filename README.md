# hyposcript ![npm](https://img.shields.io/npm/v/hyposcript)

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

Since hyposcript is basically just concatenating strings, benchmark comparisons
with hyperscript or React are not fair. Even so, there's a simple benchmark
here to general reference. These were run on an 2.4 GHz 8-Core Intel Core i9
MacBook Pro.

As you can see, if you're targeting a server environment, hyposcript is a good
option.

```
react            x 44,897 ops/sec ±0.96% (93 runs sampled)
hyperscript      x 20,925 ops/sec ±0.57% (93 runs sampled)
hyposcript       x 147,761 ops/sec ±0.86% (92 runs sampled)
```

### License

MIT License © [Eric Bailey](https://estrattonbailey.com)
