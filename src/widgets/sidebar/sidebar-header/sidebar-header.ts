import { Block, BlockProps } from '@/shared/lib'
import { Avatar, Link, SearchInput } from '@/shared/ui'
import styles from './sidebar-header.module.css'

// language=hbs
const template = `
    <div class="${styles.wrapper}">
        {{{profileLink}}}
        {{{searchInput}}}
    </div>
`

export class SidebarHeader extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      profileLink: new Link({
        href: '/profile',
        children: new Avatar({ width: 40, height: 40 }),
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
