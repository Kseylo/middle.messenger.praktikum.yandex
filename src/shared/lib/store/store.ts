import { EventBus } from '@/shared/lib'
import { set } from './set'

export enum StoreEvents {
  UPDATED = 'UPDATED',
}

class Store extends EventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _state: any = {}

  getState() {
    return this._state
  }

  setState(path: string, value: unknown) {
    this._state = set(this._state, path, value)
    this.dispatch(StoreEvents.UPDATED, this._state as object)
  }
}

export default new Store()
