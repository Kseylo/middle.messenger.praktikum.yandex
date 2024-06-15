import { type Indexed } from '@/shared/config'
import { EventBus } from '@/shared/lib'
import { set } from './set'

export enum StoreEvents {
  UPDATED = 'UPDATED',
}

class Store extends EventBus {
  private _state: Indexed = {}

  getState() {
    return this._state
  }

  setState(path: string, value: unknown) {
    this._state = set(this._state, path, value) as Indexed
    this.dispatch(StoreEvents.UPDATED, this._state)
  }
}

export default new Store()
