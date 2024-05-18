// language=hbs
import { Block, type BlockProps } from '@/shared/lib'
import { InputWithLabel } from '@/shared/ui'

const template = `
    <form class='profile-form'>
        {{{loginInput}}}
        {{{emailInput}}}
        {{{phoneInput}}}
        {{{nameInput}}}
        {{{secondNameInput}}}
        {{{displayNameInput}}}
        <button class='button button-primary'>Обновить профиль</button>
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
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
