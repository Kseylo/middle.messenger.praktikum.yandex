import { type ChangePasswordData } from '@/shared/config'
import { UserController } from '@/shared/controllers'
import { Block, BlockProps, FIELDS, Validator } from '@/shared/lib'
import { Button, InputWithLabel } from '@/shared/ui'
import styles from './update-account.module.css'

// language=hbs
const template = `
    <div class="card ${styles.wrapper}">
        <form class='${styles.form}'>
            {{{oldPasswordInput}}}
            {{{newPasswordInput}}}
            {{{button}}}
        </form>
    </div>
`

export class UpdateAccount extends Block {
  constructor(props: BlockProps) {
    const oldPasswordInput = new InputWithLabel({
      name: FIELDS.PASSWORD,
      label: 'Старый пароль',
      id: 'oldPassword',
      placeholder: 'Старый пароль',
      type: 'password',
      events: {
        blur: () => {
          Validator.validateInput(oldPasswordInput)
        },
      },
    })
    const newPasswordInput = new InputWithLabel({
      name: FIELDS.PASSWORD,
      label: 'Новый пароль',
      id: 'newPassword',
      placeholder: 'Новый пароль',
      type: 'password',
      events: {
        blur: () => {
          Validator.validateInput(newPasswordInput)
        },
      },
    })
    super({
      ...props,
      oldPasswordInput,
      newPasswordInput,
      button: new Button({
        children: 'Обновить аккаунт',
        events: {
          click: async (event) => {
            event.preventDefault()
            const inputs = [oldPasswordInput, newPasswordInput]
            const isAllInputsValid = Validator.validateInputs(inputs)

            if (isAllInputsValid) {
              const results: Record<string, string> = {}
              inputs.forEach((input) => {
                const inputElement = input.getContent().querySelector('input')
                if (inputElement) {
                  results[inputElement.id] = inputElement.value
                }
              })
              await UserController.changePassword(
                results as unknown as ChangePasswordData,
              )
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
