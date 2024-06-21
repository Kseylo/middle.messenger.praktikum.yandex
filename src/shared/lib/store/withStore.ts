import { IChat, type Indexed, Message, User } from '@/shared/config'
import { Block, BlockProps, isEqual } from '@/shared/lib'
import { default as store, StoreEvents } from './store'

interface State {
  user: User
  chats: IChat[]
  selectedChatId: IChat['id']
  messages: Message[]
}

export function withStore<StateProps>(
  mapStateToProps: (state: State) => StateProps,
) {
  // @ts-expect-error - Fix later when i have better idea how to do it
  return function wrapper<Props>(Component: typeof Block<StateProps & Props>) {
    return class WithStore extends Component {
      constructor(props: Omit<Props, keyof StateProps>) {
        let state = mapStateToProps(store.getState())

        super({ ...props, ...state })

        store.subscribe(StoreEvents.UPDATED, () => {
          const newState = mapStateToProps(store.getState())

          if (!isEqual(state as Indexed, newState as Indexed)) {
            this.setProps({ ...(newState as BlockProps) })
          }

          state = newState
        })
      }
    }
  }
}
