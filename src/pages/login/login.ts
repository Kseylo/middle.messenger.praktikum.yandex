import { Block, type BlockProps } from '@/shared/lib/block'
import { InputWithLabel } from '@/shared/ui'
import styles from './login.module.css'

type LoginProps = BlockProps

const template = `
<main class='${styles.container}'>
  <form class='card ${styles.form}'>
    <h1 class='${styles.title}'>Вход</h1>
    {{{ loginInput }}}
    {{{ passwordInput }}}
    <div class='${styles.actions}'>
      <a href="/chat">
        <button class='button button-primary' style="width: 100%; pointer-events: none">Войти</button>
      </a>
      <a href='/sign-up'>Нет аккаунта?</a>
    </div>
  </form>
</main>
`

export class Login extends Block<LoginProps> {
  constructor(props: LoginProps) {
    super({
      ...props,
      loginInput: new InputWithLabel({
        id: 'login',
        label: 'Логин',
        placeholder: 'Логин',
        name: 'login',
        events: {
          blur: () => console.log('Hello World'),
        },
      }),
      passwordInput: new InputWithLabel({
        id: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
        name: 'password',
        type: 'password',
        events: {
          blur: () => {
            console.log(this.children.passwordInput)
          },
        },
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
