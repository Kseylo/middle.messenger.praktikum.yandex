import { EventBus } from './event-bus'

describe('EventBus', () => {
  let eventBus: EventBus
  let callback: jest.Mock

  beforeEach(() => {
    eventBus = new EventBus()
    callback = jest.fn()
  })

  it('should subscribe to event', () => {
    eventBus.subscribe('testEvent', callback)
    // @ts-expect-error need for test
    expect(eventBus.subscribers.testEvent).toContain(callback)
  })

  it('should call callback when event dispatched', () => {
    eventBus.subscribe('testEvent', callback)
    eventBus.dispatch('testEvent', { data: 'test' })

    expect(callback).toHaveBeenCalledWith({ data: 'test' })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should allow multiple subscriptions to the same event', () => {
    const callback2 = jest.fn()
    eventBus.subscribe('testEvent', callback)
    eventBus.subscribe('testEvent', callback2)

    eventBus.dispatch('testEvent', { data: 'test' })

    expect(callback).toHaveBeenCalledWith({ data: 'test' })
    expect(callback2).toHaveBeenCalledWith({ data: 'test' })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })

  it('should unsubscribe from event', () => {
    eventBus.subscribe('testEvent', callback)
    eventBus.unsubscribe('testEvent', callback)

    // @ts-expect-error need for test
    expect(eventBus.subscribers.testEvent).not.toContain(callback)
  })

  it('should throw error when unsubscribe from non-existent event', () => {
    expect(() => eventBus.unsubscribe('testEvent', callback)).toThrow(
      'Нет события: testEvent',
    )
  })

  it('should not call the unsubscribed event', () => {
    eventBus.subscribe('testEvent', callback)
    eventBus.unsubscribe('testEvent', callback)
    eventBus.dispatch('testEvent', { data: 'test' })

    expect(callback).not.toHaveBeenCalled()
  })
})
