import { Block, BlockProps } from '@/shared/lib/block'

const template = `
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
`

interface ChatProps extends BlockProps {
  title: string
  messageTime: string
  lastMessage: string
  unreadCount?: number
}

export class Chat extends Block<ChatProps> {
  render() {
    return this.compile(template, this.props)
  }
}
