import { Block, BlockProps } from '@/shared/lib/block'
import styles from './message.module.css'

interface MessageProps extends BlockProps {
  message: string
  time: string
  isYourMessage?: boolean
  isMessageRead?: boolean
}

// language=hbs
const template = `
    <div class='${styles.wrapper} {{#if isYourMessage}}${styles.sender}{{/if}}'>
        <div class='${styles.message}'>
            {{message}}
            <div class="${styles.timeWrapper}">
                {{#if isYourMessage}}
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="16"
                         height="16"
                         viewBox="0 0 24 24"
                         class="icon ${styles.icon} {{#if isMessageRead}}${styles.read}{{/if}}">
                        <path d="M18 6 7 17l-5-5" />
                        <path d="m22 10-7.5 7.5L13 16" />
                    </svg>
                {{/if}}
                <span class='${styles.time}'>{{time}}</span>
            </div>
        </div>
    </div>
`

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props })
  }

  render() {
    return this.compile(template, this.props)
  }
}
