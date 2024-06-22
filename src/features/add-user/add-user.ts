import { IChat } from '@/shared/config'
import { ChatsController, UserController } from '@/shared/controllers'
import { Block, BlockProps } from '@/shared/lib'
import { withStore } from '@/shared/lib/store'
import { Button, InputWithLabel } from '@/shared/ui'
import styles from './add-user.module.css'

// language=hbs
const template = `
      <form class="${styles.form}">
          {{{userInput}}}
          {{{button}}}
      </form>
  `

interface AddUserProps extends BlockProps {
  onSubmit?: () => void
  selectedChat: IChat
}

class AddUser extends Block<AddUserProps> {
  constructor(props: AddUserProps) {
    const userInput = new InputWithLabel({
      label: 'Логин',
      placeholder: 'Введите логин пользователя',
      id: 'newChatInput',
    })
    super({
      ...props,
      userInput,
      button: new Button({
        children: 'Добавить пользователя',
        variant: 'primary',
        type: 'submit',
      }),
      events: {
        submit: async (event) => {
          event.preventDefault()
          const login = userInput.getContent().querySelector('input')?.value
          if (login) {
            const user = await UserController.searchUser(login)
            if (user) {
              await ChatsController.addUser({
                chatId: this.props.selectedChat.id,
                users: [user.id],
              })
              this.props.onSubmit?.()
            }
          }
        },
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withSelectedChat = withStore((state) => ({
  selectedChat: state.selectedChat,
}))
export default withSelectedChat(AddUser as typeof Block)
