type EventName = string

type EventPayload<T> = T

export class EventBus {
  private readonly subscribers: Record<EventName, Function[]>
  private static instance?: EventBus = undefined

  private constructor() {
    this.subscribers = {}
  }

  static getInstance(): EventBus {
    if (this.instance === undefined) {
      this.instance = new EventBus()
    }
    return this.instance
  }

  subscribe<T>(event: EventName, callback: (payload: EventPayload<T>) => void) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = []
    }
    this.subscribers[event].push(callback)
  }

  unsubscribe(event: EventName, callback: Function) {
    if (!this.subscribers[event]) {
      throw new Error(`Нет события: ${event}`)
    }
    this.subscribers[event] = this.subscribers[event].filter(
      (subscriber) => subscriber !== callback,
    )
  }

  dispatch<T>(event: EventName, payload: EventPayload<T>) {
    if (!this.subscribers[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.subscribers[event].forEach((subscriber) => subscriber(payload))
  }
}
