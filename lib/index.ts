/// <reference path="../jsx.d.ts" />

import { Properties as CSSProperties } from 'csstype'

type CSSPropertyNames = keyof CSSProperties

export type Element = Function | { children: Child[] } | keyof HTMLElementTagNameMap | string
export type Props = {
  style?: { [property in CSSPropertyNames]?: string | number }
  [attribute: string]: any
}
export type Child = string | boolean | number | null
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
    const v = style[p]
    if (v || typeof v === 'number') s += k + ':' + style[p] + ';'
  }

  return s
}

export function h(tag: Element, props: Props, ...children: Child[] | Child[][]): string {
  // multiple children as immediate children
  if (typeof tag === 'object' && tag.children) return tag.children.join('')

  props = props || {}

  const c = []
  children = children.length ? children : props.children || []

  while (children.length) {
    const child = children.shift()
    if (!child) continue
    switch (typeof child) {
      case 'string':
        c.push(child)
        break
      case 'number':
        c.push(`${child}`)
        break
      case 'boolean':
        continue
      default:
        // @ts-expect-error
        children.push(...child)
    }
  }

  // needed for JSX
  if (typeof tag === 'function') return tag({ ...props, children: c })

  let attrs = ''

  for (const k of Object.keys(props)) {
    if (k === 'children') continue

    let value = props[k]
    const key = aliases[k] || k

    if (typeof value === 'boolean' || value === '') {
      attrs += `${key} `
      continue
    }

    if (value === 0) value += ''

    if (k === 'style') value = styleObjectToString(value)

    if (value) attrs += `${key}="${value}"`
  }

  const a = attrs ? ' ' + attrs.trim() : ''
  const v = voids.indexOf(tag as string) > -1

  let childs = ''

  while (c.length) {
    childs += c.shift()
  }

  return v ? '<' + tag + a + ' />' : '<' + tag + a + '>' + childs + '</' + tag + '>'
}
