import { Block, BlockProps } from '@/shared/lib/block'
import { Avatar } from '@/shared/ui'
import styles from './chat.module.css'

// language=hbs
const template = `
    <li class="${styles.container} ${styles.noWrap}">
      {{{ avatar }}}
      <div class="${styles.wrapper}">
        <div class="${styles.row} ${styles.noWrap}">
          <h4 class="${styles.userTitle} ${styles.noWrap}">{{this.title}}</h4>
          <time class="${styles.messageTime}">{{this.messageTime}}</time>
        </div>
        <div class="${styles.row} ${styles.noWrap}">
          <p class="${styles.lastMessage} ${styles.noWrap}">{{this.lastMessage}}</p>
          {{#if this.unreadCount}}
            <span class="${styles.unreadCount}">{{this.unreadCount}}</span>
          {{/if}}
        </div>
      </div>
    </li>
`

interface ChatProps extends BlockProps {
  title: string
  messageTime: string
  lastMessage: string
  unreadCount?: number
}

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props, avatar: new Avatar({ width: 56, height: 56 }) })
  }

  render() {
    return this.compile(template, this.props)
  }
}
