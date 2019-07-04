import { handleError } from './error'

export function acall (value, errorHandler = handleError) {
  if (Array.isArray(value)) {
    Promise.all(value.map(asyncFn => asyncFn())).catch(errorHandler)
    return
  }

  value().catch(errorHandler)
}
