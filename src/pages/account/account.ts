import { Block, BlockProps } from '@/shared/lib/block'
import { Input } from '@/shared/ui'
import { Sidebar } from '@/widgets'
import styles from './account.module.css'

const template = `
<div class='${styles.container}'>
    {{{ sidebar }}}
  <main class="${styles.main}">
    <header class="sidebar-header">
      <a href="/profile" class="sidebar-link">Профиль</a>
      <a href="/account" class="sidebar-link sidebar-link__active">Аккаунт</a>
    </header>
    <div class="${styles.main}">
      <div class="${styles.wrapper} card">
        <form class="${styles.form}">
          {{{ oldPasswordInput }}}
          {{{ newPasswordInput}}}
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
    const oldPasswordInput = new Input({
      id: 'oldPassword',
      label: 'Старый пароль',
      placeholder: 'Старый пароль',
      name: 'oldPassword',
      type: 'password',
    })
    const newPasswordInput = new Input({
      id: 'newPassword',
      label: 'Новый пароль',
      placeholder: 'Новый пароль',
      name: 'newPassword',
      type: 'password',
    })
    const sidebar = new Sidebar({})
    super({
      ...props,
      oldPasswordInput,
      newPasswordInput,
      sidebar,
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
