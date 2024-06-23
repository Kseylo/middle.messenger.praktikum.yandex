import { Routes } from '@/shared/config'
import { type SignUpRequest } from '@/shared/config'
import { AuthController } from '@/shared/controllers'
import { Block, BlockProps, FIELDS, Validator } from '@/shared/lib'
import { Button, InputWithLabel, Link } from '@/shared/ui'
import styles from './sign-up-form.module.css'

// language=hbs
const template = `
    <form class='card ${styles.form}'>
        <h1 class='${styles.title}'>Регистрация</h1>
        {{{loginInput}}}
        {{{emailInput}}}
        {{{firstNameInput}}}
        {{{secondNameInput}}}
        {{{phoneInput}}}
        {{{passwordInput}}}
        <div class='${styles.actions}'>
            {{{button}}}
            {{{loginLink}}}
        </div>
    </form>
`

export class SignUpForm extends Block {
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
    const emailInput = new InputWithLabel({
      id: FIELDS.EMAIL,
      label: 'Email',
      type: 'email',
      placeholder: 'pochta@yandex.ru',
      name: FIELDS.EMAIL,
      events: {
        blur: () => {
          Validator.validateInput(emailInput)
        },
      },
    })
    const firstNameInput = new InputWithLabel({
      id: FIELDS.FIRST_NAME,
      label: 'Имя',
      placeholder: 'Имя',
      name: FIELDS.FIRST_NAME,
      events: {
        blur: () => {
          Validator.validateInput(firstNameInput)
        },
      },
    })
    const secondNameInput = new InputWithLabel({
      id: FIELDS.SECOND_NAME,
      label: 'Фамилия',
      placeholder: 'Фамилия',
      name: FIELDS.SECOND_NAME,
      events: {
        blur: () => {
          Validator.validateInput(secondNameInput)
        },
      },
    })
    const phoneInput = new InputWithLabel({
      id: FIELDS.PHONE,
      label: 'Телефон',
      placeholder: '+7 (999) 999-99-99',
      name: FIELDS.PHONE,
      type: 'tel',
      events: {
        blur: () => {
          Validator.validateInput(phoneInput)
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

    const loginLink = new Link({
      children: 'Войти',
      href: Routes.Login,
      active: true,
    })

    super({
      ...props,
      loginInput,
      emailInput,
      firstNameInput,
      secondNameInput,
      phoneInput,
      passwordInput,
      loginLink,
      button: new Button({
        children: 'Зарегистрироваться',
        type: 'submit',
        events: {
          click: async (event) => {
            event.preventDefault()
            const inputs = [
              loginInput,
              emailInput,
              firstNameInput,
              secondNameInput,
              phoneInput,
              passwordInput,
            ]
            const isAllInputsValid = Validator.validateInputs(inputs)

            if (isAllInputsValid) {
              const results: Record<string, string> = {}
              inputs.forEach((input) => {
                const inputElement = input.getContent().querySelector('input')
                if (inputElement) {
                  results[inputElement.id] = inputElement.value
                }
              })
              await AuthController.signUp(results as unknown as SignUpRequest)
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
