import { AttachFile, SendMessage } from '@/features'
import { Block, type BlockProps } from '@/shared/lib'
import styles from './chat-feed-footer.module.css'

type ChatFeedFooterProps = BlockProps

// language=hbs
const template = `
  <footer class="${styles.footer}">
      {{{attachFile}}}
      {{{sendMessage}}}
  </footer>
`

export class ChatFeedFooter extends Block {
  constructor(props: ChatFeedFooterProps) {
    super({
      ...props,
      sendMessage: new SendMessage({}),
      attachFile: new AttachFile({}),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
