import { type Indexed } from '@/shared/config'
import { EventBus } from '@/shared/lib'
import { set } from './set'

export enum StoreEvents {
  UPDATED = 'UPDATED',
}

export class Store extends EventBus {
  private _state: Indexed = {}

  getState() {
    return this._state
  }

  setState(path: string, value: unknown) {
    set(this._state, path, value)
    this.dispatch(StoreEvents.UPDATED)
  }
}

export const store = new Store()
