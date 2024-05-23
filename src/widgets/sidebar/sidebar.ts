import { chatsPlaceholderData } from '@/shared/config'
import { Block, BlockProps } from '@/shared/lib/block'
import { Chat, ChatHeader } from '@/shared/ui'
import styles from './sidebar.module.css'
import { SidebarHeader } from './sidebar-header'

// language=hbs
const template = `
<aside class='${styles.sidebar}'>
    {{{ sidebarHeader }}}
  <ul class='${styles.chatList}'>
    {{{chatList}}}
  </ul>
</aside>
`

type SidebarProps = BlockProps

export class Sidebar extends Block<SidebarProps> {
  constructor(props: SidebarProps) {
    const chatList = chatsPlaceholderData.map((chat) => new Chat({ ...chat }))
    super({
      ...props,
      chatList,
      sidebarHeader: new ChatHeader({ children: new SidebarHeader({}) }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
