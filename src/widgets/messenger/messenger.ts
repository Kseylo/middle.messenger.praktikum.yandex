import { IChat, User } from '@/shared/config'
import { ChatsController, MessageController } from '@/shared/controllers'
import { Block, BlockProps, isEqual } from '@/shared/lib'
import { withStore } from '@/shared/lib/store'
import styles from './messenger.module.css'
import { MessengerFooter } from './messenger-footer'
import { MessengerHeader } from './messenger-header'
import { MessengerMessages } from './messenger-messages'

// language=hbs
const template = `
<main class="${styles.main}">
    {{{messengerHeader}}}
    {{{messengerMessages}}}
    {{{messengerFooter}}}
</main>
`

interface MessengerProps extends BlockProps {
  selectedChat: IChat
  userId: User['id']
}

class Messenger extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super({
      ...props,
      messengerHeader: new MessengerHeader({}),
      messengerMessages: new MessengerMessages({}),
      messengerFooter: new MessengerFooter({}),
    })
  }

  componentDidUpdate(
    oldProps: MessengerProps,
    newProps: MessengerProps,
  ): boolean {
    if (!isEqual(oldProps, newProps)) {
      ChatsController.getChatToken(newProps.selectedChat.id).then((token) => {
        MessageController.connect(
          token,
          newProps.userId,
          newProps.selectedChat.id,
        )
      })
      return true
    }
    return false
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withState = withStore((state) => ({
  selectedChat: state.selectedChat,
  userId: state.user.id,
}))
export default withState(Messenger as typeof Block)
