// #c74059 -> [199, 64, 89]
export function hexToRGB (hex) {
  return hex.slice(1).match(/.{1,2}/g).map(v => parseInt(v, 16))
}

// [199, 64, 89] -> #c74059
export function rgbToHex (rgb) {
  const [r, g, b] = rgb.map(v => v.toString(16).padStart(2, '0'))
  return ['#', r, g, b].join('')
}

/**
 * Dimodifikasi dari Bootstrap `color-yiq`:
 * https://github.com/twbs/bootstrap/blob/0ad0985ac0f8dce207876b81852f00b34ffc786f/scss/_functions.scss#L51
 */
export function getTextColor (colorHex, colorDark = '#212529', colorLight = '#fff') {
  const YIQ_THRESHOLD = 150
  const [r, g, b] = hexToRGB(colorHex)

  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return yiq >= YIQ_THRESHOLD ? colorDark : colorLight
}
