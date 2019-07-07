import ky, { HTTPError } from 'ky'
import cookie from 'js-cookie'

export const apiUrl = process.env.VUE_APP_API_URL

export const api = ky.extend({
  prefixUrl: apiUrl,
  credentials: 'include'
})

export class APIError extends Error {
  constructor (message, code, data, client = true) {
    super(`${client ? 'Client' : 'Server'} error: ${message} (${code})`)
    this.code = code
    this.data = data
  }
}

export async function request (path, opts = {}) {
  const { method = 'get' } = opts

  try {
    const response = await api(path, {
      headers: { 'X-CSRF-Token': await _getCSRFToken() },
      ...opts
    })

    switch (response.status) {
      case 204:
      case 205:
        return
      default:
        return response.json()
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      const { response } = error
      const { status } = response

      switch (status) {
        case 400:
        case 500:
        {
          const { message, code, data } = await response.json()
          throw new APIError(message, code, data, status === 400)
        }
        case 404:
          if (method.toLowerCase() === 'get') {
            return false
          }

          break
        default:
          break
      }
    }

    throw error
  }
}

export async function getUser () {
  return api.get('auth').json()
}

async function _getCSRFToken () {
  if (!cookie.get('csrf-token')) {
    await api.head('ping')
  }

  return cookie.get('csrf-token')
}
