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

export function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isIndexed(value) || isArray(value)
}

export function isIndexed(value: unknown): value is Indexed {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

export function getFormattedDate(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()

  const isToday = date.toDateString() === now.toDateString()
  const isThisWeek = now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000

  if (isToday) {
    return date.toLocaleTimeString(['ru-Ru'], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  if (isThisWeek) {
    return date.toLocaleDateString(['ru-Ru'], { weekday: 'long' })
  }
  return date.toLocaleDateString(['ru-Ru'], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
