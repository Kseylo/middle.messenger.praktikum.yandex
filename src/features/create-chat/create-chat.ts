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

type CreateChatProps = BlockProps

export class CreateChat extends Block<CreateChatProps> {
  constructor(props: CreateChatProps) {
    super({
      ...props,
      newChatInput: new InputWithLabel({
        label: 'Новый чат',
        placeholder: 'Введите название чата',
        id: 'newChatInput',
      }),
      button: new Button({
        children: 'Создать чат',
        variant: 'primary',
        type: 'submit',
      }),
      events: {
        submit: async (event) => {
          event.preventDefault()
          console.log('submit')
        },
      },
    })
  }

  render() {
    return this.compile(template, {})
  }
}
