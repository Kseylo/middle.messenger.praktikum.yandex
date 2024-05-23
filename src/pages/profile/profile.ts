import { Block, BlockProps } from '@/shared/lib/block'
import { Link } from '@/shared/ui'
import { SettingsHeader, Sidebar, UpdateProfile } from '@/widgets'
import styles from './profile.module.css'

const template = `
<div class='app'>
  {{{ sidebar }}}
  <main class="${styles.main}">
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
      sidebar: new Sidebar({}),
      updateProfile: new UpdateProfile(),
      settingsHeader: new SettingsHeader({
        links: [
          new Link({ text: 'Профиль', href: '/profile', active: true }),
          new Link({ text: 'Аккаунт', href: '/account' }),
        ],
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
