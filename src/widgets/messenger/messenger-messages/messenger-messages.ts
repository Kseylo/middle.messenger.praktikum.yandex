import type { IMessage, User } from '@/shared/config'
import { Block, BlockProps, isEqual } from '@/shared/lib'
import { withStore } from '@/shared/lib/store'
import { Message } from '@/shared/ui'
import styles from './messenger-messages.module.css'

interface MessengerMessagesProps extends BlockProps {
  messages: IMessage[]
  messageList: Message[]
  user: User
}

class MessengerMessages extends Block<MessengerMessagesProps> {
  constructor(props: MessengerMessagesProps) {
    super({ ...props })
  }

  componentDidUpdate(
    oldProps: MessengerMessagesProps,
    newProps: MessengerMessagesProps,
  ) {
    if (!isEqual(oldProps, newProps)) {
      if (newProps.messages) {
        // @ts-expect-error - TODO: if i add messages to props, i get recursion error
        this.setProps({
          messageList: this.createMessages(newProps.messages),
        })
      }
      return true
    }
    return false
  }

  createMessages(messages: IMessage[]) {
    return messages.map(
      (message) =>
        new Message({
          message: message.content,
          isYourMessage: message.user_id === this.props.user.id,
          time: new Date(message.time).toLocaleTimeString('ru-Ru', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }),
    )
  }

  render() {
    return this.compile(
      `<div class='${styles.messages}'>{{{messageList}}}</div>`,
      this.props,
    )
  }
}

const withState = withStore((state) => ({
  messages: state.messages,
  user: state.user,
}))

export default withState(MessengerMessages as typeof Block)
