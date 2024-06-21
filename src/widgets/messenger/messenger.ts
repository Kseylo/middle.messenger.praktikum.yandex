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
  selectedChatId: IChat['id']
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
      ChatsController.getChatToken(newProps.selectedChatId).then((token) => {
        MessageController.connect(
          token,
          newProps.userId,
          newProps.selectedChatId,
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
  selectedChatId: state.selectedChatId,
  userId: state.user.id,
  messages: state.messages,
}))
export default withState(Messenger as typeof Block)
