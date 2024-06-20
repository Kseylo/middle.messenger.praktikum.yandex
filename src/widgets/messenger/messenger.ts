import { Block, BlockProps } from '@/shared/lib'
import { MediaMessage, Message } from '@/shared/ui'
import styles from './messenger.module.css'
import { MessengerFooter } from './messenger-footer'
import { MessengerHeader } from './messenger-header'

const template = `
<main class="${styles.main}">
    {{{chatFeedHeader}}}
    <div class="${styles.messages}">
      {{{messages}}}
    </div>
    {{{chatFeedFooter}}}
</main>
`

export default class Messenger extends Block {
  constructor(props: BlockProps) {
    const messages = [
      new Message({
        message:
          'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
        time: '11:56',
      }),
      new MediaMessage({
        time: '11:56',
      }),
      new Message({
        message: 'Круто!',
        time: '12:00',
        isYourMessage: true,
        isMessageRead: true,
      }),
    ]
    super({
      ...props,
      messages,
      chatFeedHeader: new MessengerHeader({}),
      chatFeedFooter: new MessengerFooter({}),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
