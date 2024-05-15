import { chatsPlaceholderData } from '@/shared/config'
import { Block, BlockProps } from '@/shared/lib/block'
import { Avatar } from '@/shared/ui'

const template = `
<div class="chat-list">
  {{#each chats}}
    <a href="/chat-feed" class="chat no-wrap">
      <div class="chat__info">
        <div class="chat__row no-wrap">
          <h4 class="chat__user-title no-wrap">{{this.title}}</h4>
          <time class="chat__message-time">{{this.messageTime}}</time>
        </div>
        <div class="chat__row no-wrap">
          <p class="chat__last-message no-wrap">{{this.lastMessage}}</p>
          {{#if this.unreadCount}}
            <span class="chat__unread-count">{{this.unreadCount}}</span>
          {{/if}}
        </div>
      </div>
    </a>
  {{/each}}
</div>
`

interface ChatListProps extends BlockProps {
  chats: typeof chatsPlaceholderData
}

export class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    const avatar = new Avatar({
      width: 40,
      height: 40,
    })
    super({ ...props, avatar })
  }

  render() {
    return this.compile(template, this.props)
  }
}
