import { Block, BlockProps } from '@/shared/lib'
import { ChatHeader } from '@/shared/ui'
import styles from './chat-feed-header.module.css'

// <header class="sidebar-header chat-feed__header">
// <h4 class="chat-feed__title">Андрей</h4>
//   <button class="button ghost-button">
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
// <circle cx="12" cy="12" r="1" />
// <circle cx="12" cy="5" r="1" />
// <circle cx="12" cy="19" r="1" />
//   </svg>
//   </button>
//   </header>

// language=hbs
const template = `
  {{{chatHeader}}}
`

interface ChatFeedHeaderProps extends BlockProps {
  content: Block
}

export class ChatFeedHeader extends Block<ChatFeedHeaderProps> {
  constructor(props: ChatFeedHeaderProps) {
    super({
      ...props,
      chatHeader: new ChatHeader({
        additionalClass: styles.header,
        content: props.content,
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
