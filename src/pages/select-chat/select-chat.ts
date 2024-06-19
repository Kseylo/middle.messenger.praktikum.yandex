import { Block, BlockProps } from '@/shared/lib/block'
import { getSidebarInstance } from '@/widgets'
import styles from './select-chat.module.css'

type SelectChatProps = BlockProps

const template = `
<div class='app'>
  {{{ sidebar }}}
  <main class="${styles.container}">
    <h1 class="${styles.title}">Выберите чат чтобы отправить сообщение</h1>
  </main>
</div>
`

export class SelectChat extends Block {
  constructor(props: SelectChatProps) {
    const sidebar = getSidebarInstance({})
    super({ ...props, sidebar })
  }

  render() {
    return this.compile(template, this.props)
  }
}
