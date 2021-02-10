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
  let s = ''

  for (const p in style) {
    const k = p.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
    s += k + ':' + style[p] + ';'
  }

  return s
}

function h (t, props, ...children) {
  if (t.children) return t.children.join('')

  props = props || {}

  const c = []

  children = children.length ? children : props.children || []

  while (children.length) {
    const child = children.shift()
    child.pop ? children.push(...child) : c.push(child)
  }

  if (t.call) return t({ ...props, children: c })

  let attrs = ''

  for (const k in props) {
    if (k === 'children') continue

    let v = props[k]
    const key = aliases[k] || k

    if (typeof v === 'boolean') {
      attrs += `${key}`
      continue
    }

    if (k === 'style') v = styleObjectToString(v)

    attrs += `${key}="${v}"`
  }

  const a = attrs ? ' ' + attrs : ''
  const v = voids.indexOf(t) > -1

  let childs = ''

  while (c.length) {
    childs += c.shift()
  }

  return v ? '<' + t + a + ' />' : '<' + t + a + '>' + childs + '</' + t + '>'
}

module.exports = { h, styleObjectToString }
