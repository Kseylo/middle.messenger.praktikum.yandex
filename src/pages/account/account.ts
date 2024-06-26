import { UpdateAccount } from '@/features'
import { Routes } from '@/shared/config'
import { Block, BlockProps } from '@/shared/lib/block'
import { Link } from '@/shared/ui'
import { getSidebarInstance, SettingsHeader } from '@/widgets'
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
      sidebar: getSidebarInstance({}),
      settingsHeader: new SettingsHeader({
        links: [
          new Link({ children: 'Профиль', href: Routes.Profile }),
          new Link({ children: 'Аккаунт', href: Routes.Account, active: true }),
        ],
      }),
      updateAccount: new UpdateAccount({}),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
