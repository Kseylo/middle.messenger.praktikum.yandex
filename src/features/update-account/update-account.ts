import { Block, BlockProps } from '@/shared/lib'
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
    super({
      ...props,
      oldPasswordInput: new InputWithLabel({
        name: 'oldPassword',
        label: 'Старый пароль',
        id: 'oldPassword',
        placeholder: 'Старый пароль',
        type: 'password',
      }),
      newPasswordInput: new InputWithLabel({
        name: 'newPassword',
        label: 'Новый пароль',
        id: 'newPassword',
        placeholder: 'Новый пароль',
        type: 'password',
      }),
      button: new Button({ children: 'Обновить аккаунт' }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
