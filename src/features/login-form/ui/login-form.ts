import { Block, BlockProps, FIELDS, Validator } from '@/shared/lib'
import { Button, InputWithLabel } from '@/shared/ui'
import { LoginModel } from '../model/login-model'
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
    const loginInput = new InputWithLabel({
      id: FIELDS.LOGIN,
      label: 'Логин',
      placeholder: 'Логин',
      name: FIELDS.LOGIN,
      events: {
        blur: () => {
          Validator.validateInput(loginInput)
        },
      },
    })
    const passwordInput = new InputWithLabel({
      id: FIELDS.PASSWORD,
      label: 'Логин',
      placeholder: 'Логин',
      name: FIELDS.PASSWORD,
      type: 'password',
      events: {
        blur: () => {
          Validator.validateInput(passwordInput)
        },
      },
    })
    super({
      ...props,
      loginInput,
      passwordInput,
      button: new Button({
        children: 'Войти',
        type: 'submit',
        events: {
          click: (event) => {
            event.preventDefault()
            const inputs = [loginInput, passwordInput]
            const isAllInputsValid = Validator.validateInputs(inputs)
            LoginModel.login()
            if (isAllInputsValid) {
              const results: Record<string, string> = {}
              inputs.forEach((input) => {
                const inputElement = input.getContent().querySelector('input')
                if (inputElement) {
                  results[inputElement.id] = inputElement.value
                }
              })
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
