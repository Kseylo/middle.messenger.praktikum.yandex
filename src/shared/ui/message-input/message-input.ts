import { Block, BlockProps } from '@/shared/lib'
import styles from './message-input.module.css'

const template = `
<textarea
  class='${styles.messageInput}'
  placeholder='Написать сообщение'
  id='message'
  name='message'
></textarea>
`

export class MessageInput extends Block {
  constructor(props: BlockProps) {
    super({
      events: {
        input: (event) => this.adjustTextareaHeight(event),
      },
      ...props,
    })
  }

  render() {
    return this.compile(template, this.props)
  }

  adjustTextareaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
    if (textarea.value === '') {
      textarea.style.height = '2.5rem'
    }
  }
}
