import { chatsPlaceholderData } from '@/shared/config'
import { Block, BlockProps } from '@/shared/lib/block'
import { Chat } from '@/shared/ui/chat'

const template = `
<div class="chat-list">
  {{{ chats }}}
</div>
`

type ChatListProps = BlockProps

export class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props })
  }

  render() {
    return this.compile(template, this.props)
  }
}
