import { IChat, User } from '@/shared/config'
import { ChatsController, MessageController } from '@/shared/controllers'
import { Block, BlockProps, isEqual } from '@/shared/lib'
import { withStore } from '@/shared/lib/store'
import { MediaMessage, Message } from '@/shared/ui'
import styles from './messenger.module.css'
import { MessengerFooter } from './messenger-footer'
import { MessengerHeader } from './messenger-header'

const template = `
<main class="${styles.main}">
    {{{chatFeedHeader}}}
    <div class="${styles.messages}">
      {{{messages}}}
    </div>
    {{{chatFeedFooter}}}
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
      chatFeedHeader: new MessengerHeader({}),
      chatFeedFooter: new MessengerFooter({}),
    })
  }

  componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps) {
    if (!isEqual(oldProps, newProps)) {
      ChatsController.getChatToken(newProps.selectedChat.id).then((token) => {
        MessageController.connect(
          token,
          newProps.userId,
          newProps.selectedChat.id,
        )
      })
    }
    return true
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withState = withStore((state) => ({
  selectedChat: state.selectedChat,
  userId: state.user.id,
  messages: state.messages,
}))
export default withState(Messenger as typeof Block)
