type Properties = keyof import('csstype').Properties

declare namespace JSX {
  type Element = string
  interface IntrinsicElements {
    [elemName: string]: Partial<{
      id: string
      className: string
      style: { [property in Properties]?: string | number }
    }>
  }
}
