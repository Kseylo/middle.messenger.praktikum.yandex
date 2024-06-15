import { type Indexed } from '@/shared/config'
import { Block, isEqual } from '@/shared/lib'
import { default as store, StoreEvents } from './store'

export function withStore(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: Indexed) {
        let state = mapStateToProps(store.getState())

        super({ ...props, ...state })

        store.subscribe(StoreEvents.UPDATED, () => {
          const newState = mapStateToProps(store.getState())

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState })
          }

          state = newState
        })
      }
    }
  }
}
