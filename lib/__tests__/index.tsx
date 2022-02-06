import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { h, PropsWithChildren } from '../'

test('h', async () => {
  const html = <div>foo</div>
  assert.equal(html, `<div>foo</div>`)
})

test('h - number as child', async () => {
  const html = <div>{1}</div>
  assert.equal(html, `<div>1</div>`)
})

test('h - boolean as child', async () => {
  const html = <div>Hello {true}</div>
  assert.equal(html, `<div>Hello </div>`)
})

test('h - nested', async () => {
  const html = (
    <div>
      <h1>test</h1>
    </div>
  )
  assert.equal(html, `<div><h1>test</h1></div>`)
})

test('h - attrs', async () => {
  const html = <div class="test">foo</div>
  assert.equal(html, `<div class="test">foo</div>`)
})

test('h - aliases', async () => {
  const html = <div className="test">foo</div>
  assert.equal(html, `<div class="test">foo</div>`)
  const htmlFor = <label htmlFor="test">foo</label>
  assert.equal(htmlFor, `<label for="test">foo</label>`)
})

test('h - multi children', async () => {
  const html = (
    <div>
      <h1>foo</h1>
      <h1>bar</h1>
    </div>
  )
  assert.equal(html, `<div><h1>foo</h1><h1>bar</h1></div>`)
})

test('h - component', async () => {
  function Comp({ title, children }: PropsWithChildren<{ title: string }>) {
    return (
      <div>
        <h1>{title}</h1>
        {children}
      </div>
    )
  }
  const html = (
    <div>
      <Comp title="test">
        <span>foo</span>
      </Comp>
    </div>
  )
  assert.equal(html, `<div><div><h1>test</h1><span>foo</span></div></div>`)
})

test('h - style', async () => {
  const obj = <div style={{ color: 'red', fontSize: '2rem' }}>foo</div>
  assert.equal(obj, `<div style="color:red;font-size:2rem;">foo</div>`)
})

test('h - data attr', async () => {
  const html = <div data-component="foo">foo</div>
  assert.equal(html, `<div data-component="foo">foo</div>`)
})

test('h - boolean attr', async () => {
  const html = <button disabled>foo</button>
  assert.equal(html, `<button disabled>foo</button>`)
})

test('h - multiple boolean attrs', async () => {
  const html = <video loop muted playsinline src="foo.mp4"></video>
  assert.equal(html, `<video loop muted playsinline src="foo.mp4"></video>`)
})

test('h - non-boolean boolean attr + self-closing', async () => {
  const html = <input autocomplete="false" />
  assert.equal(html, `<input autocomplete="false" />`)
})

test('h - null attr', async () => {
  const html = <div class={null}>foo</div>
  assert.equal(html, `<div>foo</div>`)
})

test('h - undefined attr', async () => {
  const html = <div class={undefined}>foo</div>
  assert.equal(html, `<div>foo</div>`)
})

test('h - null style', async () => {
  const html = <div style={null}>foo</div>
  assert.equal(html, `<div>foo</div>`)
})

test('h - undefined style', async () => {
  const html = <div style={undefined}>foo</div>
  assert.equal(html, `<div>foo</div>`)
})

test('h - null prop in style', async () => {
  const html = <div style={{ color: 'red', fontSize: null }}>foo</div>
  assert.equal(html, `<div style="color:red;">foo</div>`)
})

test('h - undefined prop in style', async () => {
  const html = <div style={{ color: 'red', fontSize: undefined }}>foo</div>
  assert.equal(html, `<div style="color:red;">foo</div>`)
})

test('h - falsy prop in style', async () => {
  const html = <div style={{ color: 'red', fontSize: false }}>foo</div>
  assert.equal(html, `<div style="color:red;">foo</div>`)
})

test('h - 0 prop in style', async () => {
  const html = <div style={{ color: 'red', fontSize: 0 }}>foo</div>
  assert.equal(html, `<div style="color:red;font-size:0;">foo</div>`)
})

test('h - children & children', async () => {
  const html = (
    <div children={[]}>
      <span />
    </div>
  )
  assert.equal(html, `<div><span></span></div>`)
})

test('h - array', async () => {
  const html = <div>{true && [<span />, <span />]}</div>
  assert.equal(html, `<div><span></span><span></span></div>`)
})

test('h - fragment', async () => {
  const html = (
    <div>
      {true && (
        <>
          <span />
          <span />
        </>
      )}
    </div>
  )
  assert.equal(html, `<div><span></span><span></span></div>`)
})

test('handles falsy coercion', () => {
  const val = undefined
  const html = <div>{val && <h1>{val}</h1>}</div>
  assert.ok(!/h1/.test(html))
})

test('can return null', () => {
  const Comp = () => null
  const html = (
    <div>
      <Comp />
    </div>
  )
  assert.equal(html, '<div></div>')
})

test('multiple fn components', () => {
  const Comp = () => 'hello'
  const Comp2 = () => <div />
  const html = (
    <div>
      <Comp />
      <Comp2 />
    </div>
  )
  assert.equal(html, '<div>hello<div></div></div>')
})

/*
 * Hyperscript specific
 */

test('h - no props', async () => {
  const html = h('div', null, 'foo')
  assert.equal(html, `<div>foo</div>`)
})

test('h - array children', async () => {
  const html = h('div', null, [h('h1', {}, 'foo'), h('h1', {}, 'bar')])
  assert.equal(html, `<div><h1>foo</h1><h1>bar</h1></div>`)
})

test('h - array children with falsy values', async () => {
  const value = undefined
  const html = h('div', null, [h('h1', {}, 'foo'), value && h('h2', {}, value), false && h('h3', {}, 'baz')])
  assert.equal(html, `<div><h1>foo</h1></div>`)
})

test('h - undefined children', async () => {
  const html = h('div', {}, [h('h1', {}, 'hello'), undefined])
  assert.equal(html, `<div><h1>hello</h1></div>`)
})

test('h - children as props', async () => {
  const html = h('div', {
    children: [h('h1', {}, 'foo'), h('h1', {}, 'bar')],
  })
  assert.equal(html, `<div><h1>foo</h1><h1>bar</h1></div>`)
})

test.run()
