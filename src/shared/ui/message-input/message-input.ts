import { Block } from '@/shared/lib'
import styles from './message-input.module.css'

const template = `
<textarea
  class='${styles.messageInput}'
  placeholder='Написать сообщение'
  id='message'
  name='message'
  oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'; if (this.value === '') this.style.height = '2.5rem'"
></textarea>
`

export class MessageInput extends Block {
  render() {
    return this.compile(template, this.props)
  }
}
