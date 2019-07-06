import { handleError } from './error'

export function callFn (value) {
  return typeof value === 'function' ? value() : value
}

export function acall (value, errorHandler = handleError) {
  if (Array.isArray(value)) {
    return Promise.all(value.map(callFn)).catch(errorHandler)
  }

  return callFn(value).catch(errorHandler)
}
