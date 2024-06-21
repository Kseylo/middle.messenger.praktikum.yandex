import { IChat } from '@/shared/config'
import { getFormattedDate } from '@/shared/lib'
import { Block, BlockProps } from '@/shared/lib/block'
import { Avatar } from '@/shared/ui'
import styles from './chat.module.css'

// language=hbs
const template = `
    <li class='${styles.container} ${styles.noWrap}'>
        {{{avatar}}}
        <div class='${styles.wrapper}'>
            <div class='${styles.row} ${styles.noWrap}'>
                <h4 class='${styles.userTitle} ${styles.noWrap}'>{{this.title}}</h4>
                <time class='${styles.messageTime}'>{{this.messageTime}}</time>
            </div>
            <div class='${styles.row} ${styles.noWrap}'>
                <p
                        class='${styles.lastMessage} ${styles.noWrap}'
                >{{this.lastMessage}}</p>
                {{#if this.unreadCount}}
                    <span class='${styles.unreadCount}'>{{this.unreadCount}}</span>
                {{/if}}
            </div>
        </div>
    </li>
`

interface ChatProps extends BlockProps {
  data: IChat
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    const { data } = props
    super({
      ...props,
      title: data.title,
      messageTime: data.last_message
        ? getFormattedDate(data.last_message.time)
        : '',
      lastMessage: data.last_message?.content,
      unreadCount: data.unread_count,
      avatar: new Avatar({ width: 56, height: 56, src: data.avatar }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
