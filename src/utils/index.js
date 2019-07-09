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

export function testDefined (value) {
  return typeof value !== 'undefined'
}

export function testTruthy (value) {
  return Boolean(value)
}

export function and (values, test = testDefined) {
  for (const value of values) {
    if (!test(value)) {
      return false
    }
  }

  return true
}

export function or (values, test = testDefined) {
  for (const value of values) {
    if (test(value)) {
      return true
    }
  }

  return false
}
