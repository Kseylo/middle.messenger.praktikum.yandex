import { Block, BlockProps } from '@/shared/lib'
import { Avatar, SearchInput } from '@/shared/ui'
import styles from './sidebar-header.module.css'

// language=hbs
const template = `
    <div class="${styles.wrapper}">
        <a href='/profile' style='min-width: 40px'>{{{profileAvatar}}}</a>
        {{{searchInput}}}
    </div>
`

export class SidebarHeader extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      profileAvatar: new Avatar({ width: 40, height: 40 }),
      searchInput: new SearchInput({
        placeholder: 'Поиск',
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
