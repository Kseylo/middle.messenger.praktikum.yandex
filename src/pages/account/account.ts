import { UpdateAccount } from '@/features'
import { Block, BlockProps } from '@/shared/lib/block'
import { Link } from '@/shared/ui'
import { SettingsHeader, Sidebar } from '@/widgets'
import styles from './account.module.css'

const template = `
<div class='app'>
  {{{sidebar}}}
  <main class='${styles.main}'>
    {{{settingsHeader}}}
      <div class='${styles.wrapper}'>
        {{{updateAccount}}}
      </div>
  </main>
</div>
`

type AccountProps = BlockProps

export class Account extends Block<AccountProps> {
  constructor(props: AccountProps) {
    super({
      ...props,
      sidebar: new Sidebar({}),
      settingsHeader: new SettingsHeader({
        links: [
          new Link({ text: 'Профиль', href: '/profile' }),
          new Link({ text: 'Аккаунт', href: '/account', active: true }),
        ],
      }),
      updateAccount: new UpdateAccount({}),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
