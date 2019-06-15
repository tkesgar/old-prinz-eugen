import { handleError } from './error'

export function acall (asyncFn) {
  asyncFn().catch(handleError)
}
