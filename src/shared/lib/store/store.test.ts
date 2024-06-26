import { Store, StoreEvents } from './store'

describe('Store', () => {
  let store: Store

  beforeEach(() => {
    store = new Store()
  })

  it('should be instance of Store', () => {
    expect(store).toBeInstanceOf(Store)
  })

  it('should initialize with an empty state', () => {
    expect(store.getState()).toEqual({})
  })

  it('should set state correctly', () => {
    store.setState('user', { id: 1, name: 'test' })
    expect(store.getState()).toEqual({ user: { id: 1, name: 'test' } })
  })

  it('should dispatch UPDATED event when state is updated', () => {
    const callback = jest.fn()
    store.subscribe(StoreEvents.UPDATED, callback)
    store.setState('user', { id: 1, name: 'test' })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ user: { id: 1, name: 'test' } })
  })

  it('should update existing state correctly', () => {
    store.setState('user', { id: 1, name: 'test' })
    store.setState('user', { id: 2, name: 'test2' })

    expect(store.getState()).toEqual({ user: { id: 2, name: 'test2' } })
  })
})
