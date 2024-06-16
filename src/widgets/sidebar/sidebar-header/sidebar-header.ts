import { User } from '@/shared/config'
import { Block, BlockProps } from '@/shared/lib'
import { withStore } from '@/shared/lib/store'
import { Avatar, Link, SearchInput } from '@/shared/ui'
import styles from './sidebar-header.module.css'

// language=hbs
const template = `
    <div class="${styles.wrapper}">
        {{{profileLink}}}
        {{{searchInput}}}
    </div>
`

class SidebarHeader extends Block {
  constructor(props: BlockProps) {
    const user = props.user as User
    super({
      ...props,
      profileLink: new Link({
        href: '/profile',
        children: new Avatar({ width: 40, height: 40, src: user.avatar }),
        className: styles.profileLink,
      }),
      searchInput: new SearchInput({
        placeholder: 'Поиск',
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withUser = withStore((state) => ({ user: state.user }))
export default withUser(SidebarHeader as typeof Block)
