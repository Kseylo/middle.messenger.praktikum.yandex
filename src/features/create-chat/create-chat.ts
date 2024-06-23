import { ChatsController } from '@/shared/controllers'
import { Block, BlockProps } from '@/shared/lib'
import { Button, InputWithLabel } from '@/shared/ui'
import styles from './create-chat.module.css'

// language=hbs
const template = `
      <form class="${styles.form}">
          {{{newChatInput}}}
          {{{button}}}
      </form>
  `

interface CreateChatProps extends BlockProps {
  onSubmit?: () => void
}

export class CreateChat extends Block<CreateChatProps> {
  constructor(props: CreateChatProps) {
    const newChatInput = new InputWithLabel({
      label: 'Новый чат',
      placeholder: 'Введите название чата',
      id: 'newChatInput',
    })
    super({
      ...props,
      newChatInput,
      button: new Button({
        children: 'Создать чат',
        variant: 'primary',
        type: 'submit',
      }),
      events: {
        submit: async (event) => {
          event.preventDefault()
          const title = newChatInput.getContent().querySelector('input')?.value
          if (title) {
            await ChatsController.createChat({ title })
            this.props.onSubmit?.()
          }
        },
      },
    })
  }

  render() {
    return this.compile(template, {})
  }
}
