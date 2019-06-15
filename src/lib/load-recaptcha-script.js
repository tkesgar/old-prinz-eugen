export default function loadRecaptchaScript (opts = {}) {
  const {
    elementId = 'recaptchaScript',
    loadCallback = 'vueRecaptchaApiLoaded',
    appendTarget = window.document.head,
    async = true,
    defer = true
  } = opts

  if (!window.document.getElementById(elementId)) {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?onload=${loadCallback}&render=explicit`
    script.async = async
    script.defer = defer

    appendTarget.appendChild(script)
  }
}
