import { type Indexed } from '@/shared/config'

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result = Object.assign({}, lhs)

  for (const key in rhs) {
    if (Object.prototype.hasOwnProperty.call(rhs, key)) {
      if (isObject(lhs[key]) && isObject(rhs[key])) {
        result[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed)
      } else {
        result[key] = rhs[key]
      }
    }
  }
  return result
}

export function isObject(value: unknown): value is Indexed {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object
  }

  if (typeof path !== 'string') {
    throw new TypeError('path must be string')
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as unknown as Indexed,
  )
  return merge(object as Indexed, result)
}
