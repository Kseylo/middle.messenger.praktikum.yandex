import { IChat } from '@/shared/config'
import { ChatsController, MessageController } from '@/shared/controllers'
import { Block, BlockProps } from '@/shared/lib/block'
import { withStore } from '@/shared/lib/store'
import { Chat, ChatHeader } from '@/shared/ui'
import styles from './sidebar.module.css'
import { SidebarHeader } from './sidebar-header'

// language=hbs
const template = `
    <aside class='${styles.sidebar}'>
        {{{ sidebarHeader }}}
        {{{ chatList }}}
    </aside>
`

interface SidebarProps extends BlockProps {
  chats?: IChat[]
  selectedChat?: IChat
}

class Sidebar extends Block<SidebarProps> {
  constructor(props: SidebarProps) {
    super({
      ...props,
      sidebarHeader: new ChatHeader({ children: new SidebarHeader({}) }),
    })
  }

  componentDidMount() {
    void ChatsController.getChats()
  }

  componentDidUpdate(_oldProps: SidebarProps, newProps: SidebarProps) {
    if (newProps.chats) {
      this.setProps({ chatList: this.createChats(newProps) })
    }
    return true
  }

  createChats(props: SidebarProps) {
    return props.chats?.map(
      (chat) =>
        new Chat({
          data: chat,
          isSelected: props.selectedChat?.id === chat.id,
          events: {
            click: () => {
              if (this.props.selectedChat?.id !== chat.id) {
                MessageController.disconnect()
              }
              ChatsController.selectChat(chat)
            },
          },
        }),
    )
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withChats = withStore((state) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
}))
const SidebarWithChats = withChats(Sidebar as typeof Block)

let instance: typeof SidebarWithChats | null = null

export const getSidebarInstance = (props: SidebarProps) => {
  if (!instance) {
    // @ts-expect-error - TODO: fix this type error
    instance = new SidebarWithChats(props)
  }
  return instance
}
