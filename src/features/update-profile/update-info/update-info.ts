// language=hbs
import { Block, type BlockProps, FIELDS, Validator } from '@/shared/lib'
import { Button, InputWithLabel } from '@/shared/ui'
import styles from './update-info.module.css'

const template = `
    <form class='${styles.form}''>
        {{{loginInput}}}
        {{{emailInput}}}
        {{{firstNameInput}}}
        {{{secondNameInput}}}
        {{{phoneInput}}}
        {{{displayNameInput}}}
        {{{button}}}
    </form>
`
type UpdateInfoProps = BlockProps

export class UpdateInfo extends Block {
  constructor(props: UpdateInfoProps) {
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
      placeholder: '+7(999)999-99-99',
      name: FIELDS.PHONE,
      events: {
        blur: () => {
          Validator.validateInput(phoneInput)
        },
      },
    })
    const displayNameInput = new InputWithLabel({
      label: 'Отображаемое имя',
      name: FIELDS.DISPLAY_NAME,
      id: 'display_name',
      placeholder: 'Отображаемое имя',
      events: {
        blur: () => {
          Validator.validateInput(displayNameInput)
        },
      },
    })

    super({
      ...props,
      loginInput,
      emailInput,
      phoneInput,
      firstNameInput,
      secondNameInput,
      displayNameInput,
      button: new Button({
        children: 'Обновить профиль',
        events: {
          click: (event) => {
            event.preventDefault()
            const inputs = [
              loginInput,
              emailInput,
              phoneInput,
              firstNameInput,
              secondNameInput,
              displayNameInput,
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
              console.log(results)
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
