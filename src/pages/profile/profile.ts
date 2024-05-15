import { Block, BlockProps } from '@/shared/lib/block'
import { Avatar, Input } from '@/shared/ui'
import { Sidebar } from '@/widgets'

const template = `
<div class='app-container'>
  {{{ sidebar }}}
  <main class="profile">
    <header class="sidebar-header">
      <a href="/profile" class="sidebar-link sidebar-link__active">Профиль</a>
      <a href="/account" class="sidebar-link">Аккаунт</a>
    </header>
    <div class="profile-main">
      <div class="profile-update card">
        <div class="profile-update__avatar">
          {{{ avatar }}}
          <div>
            <h1 class="profile-name">Алексей Ложкин</h1>
            <button class="button button-primary" name="avatar">Сменить фото</button>
          </div>
        </div>
        <form class="profile-form">
          {{{ loginInput }}}
          {{{ emailInput }}}
          {{{ phoneInput }}}
          {{{ nameInput }}}
          {{{ secondNameInput }}}
          {{{ displayNameInput }}}
          <button class="button button-primary">Обновить профиль</button>
        </form>
      </div>
    </div>
  </main>
</div>
`

type ProfileProps = BlockProps

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    const sidebar = new Sidebar({})
    const avatar = new Avatar({ width: 80, height: 80 })
    const loginInput = new Input({
      id: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      name: 'login',
    })
    const emailInput = new Input({
      id: 'email',
      label: 'Email',
      placeholder: 'pochta@yandex.ru',
      name: 'email',
    })
    const phoneInput = new Input({
      id: 'phone',
      label: 'Телефон',
      placeholder: '+7 (999) 999-99-99',
      name: 'phone',
    })
    const nameInput = new Input({
      id: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      name: 'first_name',
    })
    const secondNameInput = new Input({
      id: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      name: 'second_name',
    })
    const displayNameInput = new Input({
      id: 'display_name',
      label: 'Отображаемое имя',
      placeholder: 'Отображаемое имя',
      name: 'display_name',
    })

    super({
      ...props,
      sidebar,
      avatar,
      loginInput,
      emailInput,
      phoneInput,
      nameInput,
      secondNameInput,
      displayNameInput,
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
