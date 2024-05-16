import { Block, BlockProps } from '@/shared/lib/block'
import { Avatar, ChatList, SearchInput } from '@/shared/ui'

const template = `
<aside class="sidebar">
  <div class="sidebar-header">
    <a href="/profile" style="min-width: 40px">
      {{{ profileAvatar }}}
    </a>
    {{{ searchInput}}}
  </div>
  {{{ chatList }}}
</aside>
`

type SidebarProps = BlockProps

export class Sidebar extends Block<SidebarProps> {
  constructor(props: SidebarProps) {
    const profileAvatar = new Avatar({ width: 40, height: 40 })
    const searchInput = new SearchInput({
      placeholder: 'Поиск',
    })
    const chatList = new ChatList({})
    super({ ...props, profileAvatar, searchInput, chatList })
  }

  render() {
    return this.compile(template, this.props)
  }
}
