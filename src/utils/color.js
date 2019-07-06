// #c74059 -> [199, 64, 89]
export function hexToRGB (hex) {
  return hex.slice(1).match(/.{1,2}/g).map(v => parseInt(v, 16))
}

// [199, 64, 89] -> #c74059
export function rgbToHex (rgb) {
  const [r, g, b] = rgb.map(v => v.toString(16).padStart(2, '0'))
  return ['#', r, g, b].join('')
}
