// language=hbs
import { Block, type BlockProps } from '@/shared/lib'
import { Button, InputWithLabel } from '@/shared/ui'
import styles from './update-info.module.css'

const template = `
    <form class='${styles.form}''>
        {{{loginInput}}}
        {{{emailInput}}}
        {{{phoneInput}}}
        {{{nameInput}}}
        {{{secondNameInput}}}
        {{{displayNameInput}}}
        {{{button}}}
    </form>
`
type UpdateInfoProps = BlockProps

export class UpdateInfo extends Block {
  constructor(props: UpdateInfoProps) {
    super({
      ...props,
      loginInput: new InputWithLabel({
        label: 'Логин',
        name: 'login',
        id: 'login',
        placeholder: 'Логин',
      }),
      emailInput: new InputWithLabel({
        label: 'Email',
        name: 'email',
        id: 'email',
        placeholder: 'pochta@yandex.ru',
      }),
      phoneInput: new InputWithLabel({
        label: 'Телефон',
        name: 'phone',
        id: 'phone',
        placeholder: '+7 (999) 999-99-99',
      }),
      nameInput: new InputWithLabel({
        label: 'Имя',
        name: 'first_name',
        id: 'first_name',
        placeholder: 'Имя',
      }),
      secondNameInput: new InputWithLabel({
        label: 'Фамилия',
        name: 'second_name',
        id: 'second_name',
        placeholder: 'Фамилия',
      }),
      displayNameInput: new InputWithLabel({
        label: 'Отображаемое имя',
        name: 'display_name',
        id: 'display_name',
        placeholder: 'Отображаемое имя',
      }),
      button: new Button({
        text: 'Обновить профиль',
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
