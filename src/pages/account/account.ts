import { Block, BlockProps } from '@/shared/lib/block'
import { FormInput } from '@/shared/ui'
import styles from './account.module.css'

// {{> Sidebar chats=chats }}
const template = `
<div class='app-container'>
  <main class="${styles.container}">
    <header class="sidebar-header">
      <a href="/profile" class="sidebar-link">Профиль</a>
      <a href="/account" class="sidebar-link sidebar-link__active">Аккаунт</a>
    </header>
    <div class="${styles.main}">
      <div class="${styles.wrapper} card">
        <form class="${styles.form}">
          {{{ OldPasswordInput }}}
          {{{ NewPasswordInput}}}
          {{{ ProfileAvatar }}}
          <button class="button button-primary">Обновить аккаунт</button>
        </form>
      </div>
    </div>
  </main>
</div>
`

type AccountProps = BlockProps

export class Account extends Block<AccountProps> {
  constructor(props: AccountProps) {
    const OldPasswordInput = new FormInput({
      id: 'oldPassword',
      label: 'Старый пароль',
      placeholder: 'Старый пароль',
      name: 'oldPassword',
    })
    const NewPasswordInput = new FormInput({
      id: 'newPassword',
      label: 'Новый пароль',
      placeholder: 'Новый пароль',
      name: 'newPassword',
    })
    super({ ...props, OldPasswordInput, NewPasswordInput })
  }

  render() {
    return this.compile(template, this.props)
  }
}
