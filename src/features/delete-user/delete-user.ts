import { ChatsController } from '@/shared/controllers'
import { Block, BlockProps } from '@/shared/lib'
import { Button, InputWithLabel } from '@/shared/ui'
import styles from './delete-user.module.css'

// language=hbs
const template = `
      <form class="${styles.form}">
          {{{userInput}}}
          {{{button}}}
      </form>
  `

interface DeleteUserProps extends BlockProps {
  onSubmit?: () => void
}

export class DeleteUser extends Block<DeleteUserProps> {
  constructor(props: DeleteUserProps) {
    const userInput = new InputWithLabel({
      label: 'Логин',
      placeholder: 'Введите логин пользователя',
      id: 'newChatInput',
    })
    super({
      ...props,
      userInput,
      button: new Button({
        children: 'Удалить пользователя',
        variant: 'primary',
        type: 'submit',
      }),
      events: {
        submit: async (event) => {
          event.preventDefault()
          const title = userInput.getContent().querySelector('input')?.value
          if (title) {
            await ChatsController.createChat({ title })
            this.props.onSubmit?.()
          }
        },
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
