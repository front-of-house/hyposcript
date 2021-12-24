var c = Object.defineProperty,
  k = Object.defineProperties,
  N = Object.getOwnPropertyDescriptor,
  S = Object.getOwnPropertyDescriptors,
  g = Object.getOwnPropertyNames,
  y = Object.getOwnPropertySymbols
var a = Object.prototype.hasOwnProperty,
  T = Object.prototype.propertyIsEnumerable
var h = (t, e, o) => (e in t ? c(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (t[e] = o)),
  u = (t, e) => {
    for (var o in e || (e = {})) a.call(e, o) && h(t, o, e[o])
    if (y) for (var o of y(e)) T.call(e, o) && h(t, o, e[o])
    return t
  },
  d = (t, e) => k(t, S(e)),
  C = (t) => c(t, '__esModule', { value: !0 })
var H = (t, e) => {
    for (var o in e) c(t, o, { get: e[o], enumerable: !0 })
  },
  P = (t, e, o, i) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let r of g(e))
        !a.call(t, r) &&
          (o || r !== 'default') &&
          c(t, r, { get: () => e[r], enumerable: !(i = N(e, r)) || i.enumerable })
    return t
  }
var x = (
  (t) => (e, o) =>
    (t && t.get(e)) || ((o = P(C({}), e, 1)), t && t.set(e, o), o)
)(typeof WeakMap != 'undefined' ? new WeakMap() : 0)
var v = {}
H(v, { h: () => w, styleObjectToString: () => m })
var $ = { className: 'class', htmlFor: 'for' },
  j = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
function m(t) {
  let e = ''
  for (let o in t) e += o.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase() + ':' + t[o] + ';'
  return e
}
function w(t, e, ...o) {
  if (typeof t == 'object' && t.children) return t.children.join('')
  e = e || {}
  let i = []
  for (o = o.length ? o : e.children || []; o.length; ) {
    let n = o.shift()
    !n || (typeof n == 'string' ? i.push(n) : o.push(...n))
  }
  if (typeof t == 'function') return t(d(u({}, e), { children: i }))
  let r = ''
  for (let n of Object.keys(e)) {
    if (n === 'children') continue
    let s = e[n],
      f = $[n] || n
    if (typeof s == 'boolean') {
      r += `${f}`
      continue
    }
    n === 'style' && (s = m(s)), (r += `${f}="${s}"`)
  }
  let p = r ? ' ' + r : '',
    b = j.indexOf(t) > -1,
    l = ''
  for (; i.length; ) l += i.shift()
  return b ? '<' + t + p + ' />' : '<' + t + p + '>' + l + '</' + t + '>'
}
module.exports = x(v)
0 && (module.exports = { h, styleObjectToString })
