# hyposcript ![npm](https://img.shields.io/npm/v/hyposcript) [![install size](https://packagephobia.com/badge?p=hyposcript)](https://packagephobia.com/result?p=hyposcript)

Tiny hyperscript made for server rendering.

## Usage

```js
const { h } = require('hyposcript')

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
