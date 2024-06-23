import { type Indexed } from '@/shared/config'
import { isArrayOrObject, isIndexed } from '@/shared/lib'

export function queryStringify(data: Indexed) {
  if (!isIndexed(data)) {
    throw new Error('input must be an object')
  }

  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&')
}

function getParams(data: Indexed | [], parentKey?: string) {
  const result: [string, string][] = []

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)))
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))])
    }
  }

  return result
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key
}
