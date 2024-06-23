import { Routes } from '@/shared/config'
import { Block, BlockProps } from '@/shared/lib/block'
import { Link } from '@/shared/ui'
import { getSidebarInstance, SettingsHeader, UpdateProfile } from '@/widgets'
import styles from './profile.module.css'

const template = `
<div class='app'>
  {{{ sidebar }}}
  <main class="${styles.main}">
    {{{button}}}
    {{{settingsHeader}}}
    <div class="${styles.wrapper}">
        {{{ updateProfile }}}
    </div>
  </main>
</div>
`

type ProfileProps = BlockProps

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      ...props,
      sidebar: getSidebarInstance({}),
      updateProfile: new UpdateProfile(),
      settingsHeader: new SettingsHeader({
        links: [
          new Link({ children: 'Профиль', href: Routes.Profile, active: true }),
          new Link({ children: 'Аккаунт', href: Routes.Account }),
        ],
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
