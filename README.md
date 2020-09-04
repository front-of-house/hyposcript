# hypescript ![npm](https://img.shields.io/npm/v/hypescript) [![install size](https://packagephobia.com/badge?p=hypescript)](https://packagephobia.com/result?p=hypescript)

Tiny hyperscript made for server rendering.

> Looking for [hyperscript](https://github.com/hyperhype/hyperscript)? This
> project is inspired by their incredible work, but is unaffiliated.

## Usage

```js
const { h } = require('hypescript')

h('button', { class: 'btn' }, 'Click me!')

// => <button class="btn">Click me!</button>
```

### JSX

To use with JSX you'll need to transpile. For `babel`, add this to your config:

```json
{
  "presets": [
    [
      "@babel/preset-react",
      { "pragma": "h" }
    ]
  ]
}
```

### License

MIT License © [Eric Bailey](https://estrattonbailey.com)
