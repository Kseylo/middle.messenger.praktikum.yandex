import { Block, type BlockProps } from '@/shared/lib/block'
import { Validator } from '@/shared/lib/validator'
import { Button, InputWithLabel } from '@/shared/ui'
import styles from './login.module.css'

type LoginProps = BlockProps

// language=hbs
const template = `
<main class='${styles.container}'>
  <form class='card ${styles.form}'>
    <h1 class='${styles.title}'>Вход</h1>
    {{{loginInput}}}
    {{{passwordInput}}}
    <div class='${styles.actions}'>
      {{{button}}}
      <a href='/sign-up'>Нет аккаунта?</a>
    </div>
  </form>
</main>
`

export class Login extends Block<LoginProps> {
  constructor(props: LoginProps) {
    const validator = new Validator()
    super({
      ...props,
      loginInput: new InputWithLabel({
        id: 'login',
        label: 'Логин',
        placeholder: 'Логин',
        name: 'login',
        events: {
          blur: (event) => {
            const input = event.target as HTMLInputElement
            const { errorMessage } = validator.validateLogin(input.value)
            this.children.loginInput.setProps({
              errorMessage,
            })
          },
        },
      }),
      passwordInput: new InputWithLabel({
        id: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
        name: 'password',
        type: 'password',
        events: {
          blur: (event) => {
            const input = event.target as HTMLInputElement
            const { errorMessage } = validator.validatePassword(input.value)
            this.children.passwordInput.setProps({
              errorMessage,
            })
          },
        },
      }),
      button: new Button({
        children: 'Войти',
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
