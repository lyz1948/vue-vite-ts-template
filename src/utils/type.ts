function stringContainer(str, val) {
  return str.indexOf(val) > -1
}

export const is = {
  arr: v => Array.isArray(v),
  obj: v => stringContainer(v, 'Object'),
  svg: v => v instanceof SVGElement,
  inp: v => v instanceof HTMLInputElement,
  dom: v => v.nodeType || is.svg(v),
  str: v => typeof v === 'string',
  fun: v => typeof v === 'function',
  und: v => typeof v === 'undefined',
  hex: v => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(v),
  rgb: v => /^rgb/.test(v),
  hsl: v => /^hsl/.test(v),
  col: v => is.hex(v) || is.rgb(v) || is.hsl(v),
}