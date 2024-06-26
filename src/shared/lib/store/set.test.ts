import { isObject, merge, set } from './set'

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
    expect(isObject({ a: { b: 1 } })).toBe(true)
  })

  it('should return false for non-objects', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(1)).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject(true)).toBe(false)
  })
})

describe('merge', () => {
  it('should merge two objects deeply', () => {
    const obj1 = { a: 1, b: { c: 2 } }
    const obj2 = { b: { d: 4 }, e: 5 }
    const result = merge(obj1, obj2)
    expect(result).toEqual({ a: 1, b: { c: 2, d: 4 }, e: 5 })
  })

  it('should override non-object values', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { b: { c: 3 } }
    const result = merge(obj1, obj2)
    expect(result).toEqual({ a: 1, b: { c: 3 } })
  })

  it('should handle empty objects', () => {
    const obj1 = {}
    const obj2 = { a: 1 }
    const result = merge(obj1, obj2)
    expect(result).toEqual({ a: 1 })
  })
})

describe('set', () => {
  it('should set a value at given path', () => {
    const obj = { a: 1, b: { c: 2 } }
    const result = set(obj, 'b.c', 3)
    expect(result).toEqual({ a: 1, b: { c: 3 } })
  })

  it('should create a nested object if path does not exist', () => {
    const obj = { a: 1 }
    const result = set(obj, 'b.c', 3)
    expect(result).toEqual({ a: 1, b: { c: 3 } })
  })

  it('should not modify the original object', () => {
    const obj = { a: 1 }
    const result = set(obj, 'b.c', 3)
    expect(obj).toEqual({ a: 1 })
    expect(result).toEqual({ a: 1, b: { c: 3 } })
  })

  it('should handle non-object values', () => {
    expect(set(null, 'a.b', 1)).toBeNull()
    expect(set(11, 'a.b', 1)).toBe(11)
  })

  it('should throw an error if path is not a string', () => {
    expect(() => set({}, null as unknown as string, 1)).toThrow(TypeError)
  })
})
