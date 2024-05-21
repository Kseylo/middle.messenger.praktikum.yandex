import { Block, BlockProps, FIELDS, Validator } from '@/shared/lib'
import { Button, InputWithLabel } from '@/shared/ui'
import styles from './login.module.css'

const template = `
<form class='card ${styles.form}'>
  <h1 class='${styles.title}'>Вход</h1>
  {{{loginInput}}}
  {{{passwordInput}}}
  <div class='${styles.actions}'>
    {{{button}}}
    <a href='/sign-up'>Нет аккаунта?</a>
  </div>
</form>
`

export class LoginForm extends Block {
  constructor(props: BlockProps) {
    const validator = new Validator()
    super({
      ...props,
      loginInput: new InputWithLabel({
        id: 'login',
        label: 'Логин',
        placeholder: 'Логин',
        name: FIELDS.LOGIN,
        events: {
          blur: (event) => {
            const input = event.target as HTMLInputElement
            const { errorMessage } = validator.validate(input.name, input.value)
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
        name: FIELDS.PASSWORD,
        type: 'password',
        events: {
          blur: (event) => {
            const input = event.target as HTMLInputElement
            const { errorMessage } = validator.validate(input.name, input.value)
            this.children.passwordInput.setProps({
              errorMessage,
            })
          },
        },
      }),
      button: new Button({
        children: 'Войти',
        type: 'submit',
        events: {
          click: (event) => {
            event.preventDefault()

            const results: Record<string, string> = {}
            const inputs = document.querySelectorAll('input')
            let allFieldsValid = true

            inputs.forEach((input) => {
              const { isValid, errorMessage } = validator.validate(
                input.name,
                input.value,
              )
              this.children[`${input.name}Input`].setProps({ errorMessage })
              results[input.name] = input.value
              if (!isValid) {
                allFieldsValid = false
              }
            })

            if (allFieldsValid) {
              console.log(results)
              setTimeout(() => {
                window.location.href = '/chat-feed'
              }, 2000)
            } else {
              console.log('Validation error')
            }
          },
        },
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
