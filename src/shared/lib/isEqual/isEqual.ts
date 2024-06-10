import { type Indexed } from '@/shared/config'

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key]
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value as Indexed, rightValue as Indexed)) {
        continue
      }
      return false
    }

    if (value !== rightValue) {
      return false
    }
  }

  return true
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isIndexed(value) || isArray(value)
}

function isIndexed(value: unknown): value is Indexed {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}
