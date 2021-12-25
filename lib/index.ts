import { Properties as CSSProperties } from 'csstype'

type CSSPropertyNames = keyof CSSProperties

export type Element = Function | { children: Child[] } | keyof HTMLElementTagNameMap | string
export type Props = {
  style?: { [property in CSSPropertyNames]: string | number }
  [attribute: string]: any
}
export type Child = string
export type PropsWithChildren<T> = T & {
  children?: Child | Child[]
}

const aliases = {
  className: 'class',
  htmlFor: 'for',
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
  'wbr',
]

export function styleObjectToString(style: { [property in CSSPropertyNames]: string | number }) {
  let s = ''

  for (const p in style) {
    const k = p.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
    s += k + ':' + style[p] + ';'
  }

  return s
}

export function h(tag: Element, props: Props, ...children: Child[] | Child[][]) {
  // multiple children as immediate children
  if (typeof tag === 'object' && tag.children) return tag.children.join('')

  props = props || {}

  const c = []
  children = children.length ? children : props.children || []

  while (children.length) {
    const child = children.shift()
    if (!child) continue
    // @ts-expect-error
    typeof child === 'string' ? c.push(child) : children.push(...child)
  }

  // needed for JSX
  if (typeof tag === 'function') return tag({ ...props, children: c })

  let attrs = ''

  for (const k of Object.keys(props)) {
    if (k === 'children') continue

    let value = props[k]
    const key = aliases[k] || k

    if (typeof value === 'boolean') {
      attrs += `${key}`
      continue
    }
    if (k === 'style') value = styleObjectToString(value)

    attrs += `${key}="${value}"`
  }

  const a = attrs ? ' ' + attrs : ''
  const v = voids.indexOf(tag as string) > -1

  let childs = ''

  while (c.length) {
    childs += c.shift()
  }

  return v ? '<' + tag + a + ' />' : '<' + tag + a + '>' + childs + '</' + tag + '>'
}
