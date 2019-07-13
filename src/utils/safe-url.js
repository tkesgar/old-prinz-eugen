// TODO Ini sebaiknya pakai solusi yang sudah ada.
// Bisa pakai ini: https://developers.google.com/safe-browsing/v4/lookup-api
const safeDomains = [
  'pixiv.net',
  'deviantart.com'
]

export default function isSafeURL (url) {
  try {
    const urlObj = new URL(url)
    if (safeDomains.find(domain => urlObj.hostname.endsWith(domain))) {
      return true
    }
  } catch {
    return false
  }

  return false
}
