const aliases = {
  className: 'class',
  htmlFor: 'for'
}

const voids = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]

function styleObjectToString (style) {
  return Object.keys(style)
    .map(
      p =>
        `${p.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()}:${
          style[p]
        }`
    )
    .join(';')
}

function h (t, props, ...children) {
  if (t.children) return t.children.join('')

  const p = props || {}

  const c = []

  // if props.children, prioritize that
  children = children.length ? children : p.children || []

  while (children.length) {
    const child = children.shift()
    child.pop ? children.push(...child) : c.push(child)
  }

  if (t.call) return t({ ...props, children: c })

  const attr = Object.keys(p)
    .filter(k => k !== 'children')
    .map(k => {
      let v = p[k]

      // custom handling
      if (k === 'style' && typeof v === 'object') v = styleObjectToString(v)
      if (typeof v === 'boolean') return `${aliases[k] || k}`

      return `${aliases[k] || k}="${v}"`
    })
    .join(' ')
  const a = attr ? ' ' + attr : ''
  const v = voids.indexOf(t) > -1

  return v ? `<${t}${a} />` : `<${t}${a}>${c.join('')}</${t}>`
}

module.exports = { h, styleObjectToString }
