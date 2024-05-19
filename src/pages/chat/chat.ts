import { Block, BlockProps } from '@/shared/lib/block'
import { Message } from '@/shared/ui/message'
import { ChatFeedFooter, ChatFeedHeader, Sidebar } from '@/widgets'
import styles from './chat.module.css'

type ChatFeedProps = BlockProps

const template = `
<div class='app'>
  {{{ sidebar }}}
  <main class="${styles.main}">
  {{{chatFeedHeader}}}
  {{{ message }}}
  {{{chatFeedFooter}}}
  </main>
</div>
`

export class Chat extends Block<ChatFeedProps> {
  constructor(props: ChatFeedProps) {
    const sidebar = new Sidebar({})
    const message = new Message({
      message:
        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
      time: '11:47',
    })
    super({
      ...props,
      sidebar,
      message,
      chatFeedHeader: new ChatFeedHeader({ content: 'hello' }),
      chatFeedFooter: new ChatFeedFooter({}),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
