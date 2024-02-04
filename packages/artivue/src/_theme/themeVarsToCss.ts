export function themeVarsToCSS(varsObj: Record<string, string>, selector = ':root') {
  const vars = Object.keys(varsObj).map((key) => {
    return `${key}: ${varsObj[key]};`
  }).join('\n')

  const css = `${selector} {
  ${vars}
}`

  return css.replace(/\s+/g, '')
}
