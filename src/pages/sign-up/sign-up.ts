import { Block, BlockProps } from '@/shared/lib/block'
import { FormInput } from '@/shared/ui'
import styles from './sign-up.module.css'

const template = `
<main class='${styles.container}'>
  <form class='card ${styles.form}'>
    <h1 class='${styles.title}'>Регистрация</h1>
    {{{ LoginInput }}}
    {{{ EmailInput }}}
    {{{ NameInput }}}
    {{{ SecondNameInput }}}
    {{{ PasswordInput }}}
    <div class='${styles.actions}'>
      <button class='button button-primary'>Создать аккаунт</button>
      <a href='/'>Войти</a>
    </div>
  </form>
</main>
`

type SignUpProps = BlockProps

export class SignUp extends Block<SignUpProps> {
  constructor(props: SignUpProps) {
    const LoginInput = new FormInput({
      id: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      name: 'login',
    })
    const EmailInput = new FormInput({
      id: 'email',
      label: 'Email',
      placeholder: 'pochta@yandex.ru',
      name: 'email',
    })
    const PhoneInput = new FormInput({
      id: 'phone',
      label: 'Телефон',
      placeholder: '+7 (999) 999-99-99',
      name: 'phone',
    })
    const NameInput = new FormInput({
      id: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      name: 'first_name',
    })
    const SecondNameInput = new FormInput({
      id: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      name: 'second_name',
    })
    const PasswordInput = new FormInput({
      id: 'password',
      label: 'Пароль',
      placeholder: 'Пароль',
      name: 'password',
    })

    super({
      ...props,
      LoginInput,
      EmailInput,
      PhoneInput,
      NameInput,
      SecondNameInput,
      PasswordInput,
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
