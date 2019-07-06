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

// TODO Refactor yang udah pakai request ._.
export async function request (path, body, method, opts = {}) {
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

        const withBody = ['get', 'head'].includes(method)
        return { [withBody ? 'searchParams' : 'json']: body }
      })(),
      ...opts
    })

    if (response.status === 204) {
      return
    }

    return response.json()
  } catch (err) {
    if (err instanceof HTTPError) {
      const { status } = err.response
      const isClientError = status === 400
      const isServerError = status === 500
      if (isClientError || isServerError) {
        const { message, code, data } = await err.response.json()
        throw new APIError(message, code, data, isClientError)
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
