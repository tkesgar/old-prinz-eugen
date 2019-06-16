import ky, { HTTPError } from 'ky'
import cookie from 'js-cookie'

export const apiUrl = process.env.VUE_APP_API_URL

export const api = ky.extend({
  prefixUrl: apiUrl,
  credentials: 'include'
})

export class APIError extends Error {
  constructor (message, code, data) {
    super(`${message} (${code})`)
    this.code = code
    this.data = data
  }
}

export async function request (path, body, method) {
  const hasBody = typeof body !== 'undefined'

  try {
    const response = await api(path, {
      method: method || (hasBody ? 'post' : 'get'),
      headers: {
        'X-CSRF-Token': await _getCSRFToken()
      },
      ...(() => {
        if (!hasBody) {
          return {}
        }

        const withJSONBody = ['get', 'head'].includes(method)
        return { [withJSONBody ? 'searchParams' : 'json']: body }
      })()
    })

    if (response.status === 204) {
      return
    }

    return response.json()
  } catch (err) {
    if (err instanceof HTTPError) {
      if (err.response.status === 400 || err.response.status === 500) {
        const { message, code, data } = await err.response.json()
        throw new APIError(message, code, data)
      }
    }

    throw err
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
