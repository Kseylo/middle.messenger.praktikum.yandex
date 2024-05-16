import { Block, BlockProps } from '@/shared/lib/block'
import { Message } from '@/shared/ui/message'
import { Sidebar } from '@/widgets'

type ChatFeedProps = BlockProps

const template = `
<div class='app-container'>
  {{{ sidebar }}}
  <main class="chat-feed">
    <header class="sidebar-header chat-feed__header">
      <h4 class="chat-feed__title">Андрей</h4>
      <button class="button ghost-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
    </header>
    <div>
      {{{ message }}}
    </div>
    <footer class="chat-feed__footer">
      <button class="button ghost-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
          <path
            d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      </button>
      <textarea class="textarea" placeholder="Написать сообщение" id="message" name="message"
                oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'; if (this.value === '') this.style.height = '2.5rem'"></textarea>
      <button class="button ghost-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
          <path d="m3 3 3 9-3 9 19-9Z" />
          <path d="M6 12h16" />
        </svg>
      </button>
    </footer>
  </main>
</div>
`

export class ChatFeed extends Block<ChatFeedProps> {
  constructor(props: ChatFeedProps) {
    const sidebar = new Sidebar({})
    const message = new Message({
      message:
        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
      time: '11:47',
    })
    super({ ...props, sidebar, message })
  }

  render() {
    return this.compile(template, this.props)
  }
}
