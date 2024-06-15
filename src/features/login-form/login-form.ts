import { LoginRequest } from '@/shared/api'
import { Indexed, Routes } from '@/shared/config'
import { AuthController } from '@/shared/controllers'
import { Block, BlockProps, FIELDS, Validator } from '@/shared/lib'
import { Button, InputWithLabel, Link } from '@/shared/ui'
import styles from './login.module.css'

const template = `
<form class='card ${styles.form}'>
  <h1 class='${styles.title}'>Вход</h1>
  {{{loginInput}}}
  {{{passwordInput}}}
  <div class='${styles.actions}'>
    {{{button}}}
    {{{signupLink}}}
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
      label: 'Пароль',
      placeholder: 'Пароль',
      name: FIELDS.PASSWORD,
      type: 'password',
      events: {
        blur: () => {
          Validator.validateInput(passwordInput)
        },
      },
    })
    const signupLink = new Link({
      href: Routes.SignUp,
      children: 'Нет аккаунта?',
      active: true,
    })
    super({
      ...props,
      loginInput,
      passwordInput,
      signupLink,
      button: new Button({
        children: 'Войти',
        type: 'submit',
        events: {
          click: async (event) => {
            event.preventDefault()
            const inputs = [loginInput, passwordInput]
            const isAllInputsValid = Validator.validateInputs(inputs)

            if (isAllInputsValid) {
              const results: Indexed = {}
              inputs.forEach((input) => {
                const inputElement = input.getContent().querySelector('input')
                if (inputElement) {
                  results[inputElement.id] = inputElement.value
                }
              })
              await AuthController.login(results as unknown as LoginRequest)
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
