import { ChatOptions } from '@/features'
import { Block, BlockProps } from '@/shared/lib'
import { ChatHeader } from '@/shared/ui'
import styles from './chat-feed-header.module.css'

//language=hbs
const headerTemplate = `
<div class="${styles.header}">
  <h4 class="${styles.title}">Алексей</h4>
  {{{chatOptions}}}
</div>
`

class Header extends Block {
  constructor(props: BlockProps) {
    super({ ...props, chatOptions: new ChatOptions({}) })
  }

  render() {
    return this.compile(headerTemplate, this.props)
  }
}

// language=hbs
const template = `
  {{{chatHeader}}}
`

export class ChatFeedHeader extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      chatHeader: new ChatHeader({
        additionalClass: styles.header,
        children: new Header({}),
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
