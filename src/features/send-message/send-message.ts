import { IChat } from '@/shared/config'
import { MessageController } from '@/shared/controllers'
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

interface SendMessageProps extends BlockProps {
  selectedChatId: IChat['id']
}

export default class SendMessage extends Block<SendMessageProps> {
  constructor(props: SendMessageProps) {
    super({
      ...props,
      messageInput: new MessageInput({
        events: {
          blur: (event) => {
            const isValid = this.validateMessage(event)
            if (!isValid) {
              console.log('Validation error')
            }
          },
          keydown: (event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              this.handleSubmit(event)
            }
          },
        },
      }),
      button: new Button({
        children: sendIcon,
        variant: 'ghost',
        type: 'submit',
      }),
      events: {
        submit: (event) => this.handleSubmit(event),
      },
    })
  }

  validateMessage(event: Event) {
    const message = event.target as HTMLTextAreaElement
    return Boolean(message.value)
  }

  handleSubmit(event: Event) {
    event.preventDefault()

    const textArea =
      this.children.messageInput.getContent() as HTMLTextAreaElement
    const isValid = this.validateMessage({
      target: textArea,
    } as unknown as Event)

    if (isValid) {
      MessageController.sendMessage(textArea.value)
      textArea.value = ''
    } else {
      console.log('Validation error')
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}
