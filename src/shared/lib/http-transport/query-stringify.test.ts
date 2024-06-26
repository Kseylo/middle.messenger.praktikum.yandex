import { Indexed } from '@/shared/config'
import { queryStringify } from './query-stringify'

describe('queryStringify', () => {
  it('should throw an error if input is not an object', () => {
    expect(() => queryStringify('string' as unknown as Indexed)).toThrow(
      'input must be an object',
    )
    expect(() => queryStringify(1 as unknown as Indexed)).toThrow(
      'input must be an object',
    )
    expect(() => queryStringify(null as unknown as Indexed)).toThrow(
      'input must be an object',
    )
    expect(() => queryStringify(undefined as unknown as Indexed)).toThrow(
      'input must be an object',
    )
  })

  it('should return empty string for empty object', () => {
    expect(queryStringify({})).toEqual('')
  })

  it('should stringify flat objects correctly', () => {
    const obj = { a: 1, b: 2 }
    expect(queryStringify(obj)).toEqual('a=1&b=2')
  })

  it('should stringify nested objects correctly', () => {
    const obj = { a: 1, b: { c: 2 } }
    expect(queryStringify(obj)).toEqual('a=1&b[c]=2')
  })

  it('should stringify arrays correctly', () => {
    const obj = { a: [1, 2, 3] }
    expect(queryStringify(obj)).toEqual('a[0]=1&a[1]=2&a[2]=3')
  })

  it('should encode URI correctly', () => {
    const obj = { a: 'hello world' }
    expect(queryStringify(obj)).toEqual('a=hello%20world')
  })
})
