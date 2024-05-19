import { Block, BlockProps } from '@/shared/lib/block'
import { Button, Input } from '@/shared/ui'
import styles from './sign-up.module.css'

// language=hbs
const template = `
<main class='${styles.container}'>
  <form class='card ${styles.form}'>
    <h1 class='${styles.title}'>Регистрация</h1>
    {{{loginInput}}}
    {{{emailInput}}}
    {{{nameInput}}}
    {{{secondNameInput}}}
    {{{passwordInput}}}
    <div class='${styles.actions}'>
      {{{button}}}
      <a href='/'>Войти</a>
    </div>
  </form>
</main>
`

type SignUpProps = BlockProps

export class SignUp extends Block<SignUpProps> {
  constructor(props: SignUpProps) {
    const loginInput = new Input({
      id: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      name: 'login',
    })
    const emailInput = new Input({
      id: 'email',
      label: 'Email',
      placeholder: 'pochta@yandex.ru',
      name: 'email',
    })
    const phoneInput = new Input({
      id: 'phone',
      label: 'Телефон',
      placeholder: '+7 (999) 999-99-99',
      name: 'phone',
    })
    const nameInput = new Input({
      id: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      name: 'first_name',
    })
    const secondNameInput = new Input({
      id: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      name: 'second_name',
    })
    const passwordInput = new Input({
      id: 'password',
      label: 'Пароль',
      placeholder: 'Пароль',
      name: 'password',
    })

    const button = new Button({
      children: 'Создать аккаунт',
    })

    super({
      ...props,
      loginInput,
      emailInput,
      phoneInput,
      nameInput,
      secondNameInput,
      passwordInput,
      button,
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
