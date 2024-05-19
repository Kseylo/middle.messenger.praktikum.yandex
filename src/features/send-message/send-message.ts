import { Block, BlockProps } from '@/shared/lib'
import { Button, MessageInput } from '@/shared/ui'
import styles from './send-message.module.css'

// language=hbs
const template = `
    <form class="${styles.form}">
        {{{messageInput}}}
        {{{button}}}
    </form>
`

// language=hbs
const sendIcon = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='icon'>
        <path d='m3 3 3 9-3 9 19-9Z' />
        <path d='M6 12h16' />
    </svg>
`

export class SendMessage extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      messageInput: new MessageInput({}),
      button: new Button({
        children: sendIcon,
        variant: 'ghost',
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
