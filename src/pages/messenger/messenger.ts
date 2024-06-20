import { Block, BlockProps } from '@/shared/lib/block'
import { withStore } from '@/shared/lib/store'
import { getSidebarInstance, Messenger } from '@/widgets'
import styles from './messenger.module.css'

type ChatFeedProps = BlockProps

const template = `
<div class='app'>
  {{{sidebar}}}
  {{#if selectedChatId}}
  {{{messenger}}}
  {{else}}
  <main class="${styles.container}">
    <h1 class="${styles.title}">Выберите чат чтобы отправить сообщение</h1>
  </main>
  {{/if}}
</div>
`

class MessengerPage extends Block<ChatFeedProps> {
  constructor(props: ChatFeedProps) {
    const sidebar = getSidebarInstance({})
    super({
      ...props,
      sidebar,
      messenger: new Messenger({}),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withSelectedChat = withStore((state) => ({
  selectedChatId: state.selectedChatId,
}))
export default withSelectedChat(MessengerPage as typeof Block)
