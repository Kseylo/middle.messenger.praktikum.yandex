import { Block, BlockProps } from '@/shared/lib/block'
import { Sidebar } from '@/widgets'

type SelectChatProps = BlockProps

const template = `
<div class='app-container'>
  {{{ sidebar }}}
  <main class="select-chat">
    <h1 class="select-chat__placeholder">Выберите чат чтобы отправить сообщение</h1>
  </main>
</div>
`

export class SelectChat extends Block {
  constructor(props: SelectChatProps) {
    const sidebar = new Sidebar({})
    super({ ...props, sidebar })
  }

  render() {
    return this.compile(template, this.props)
  }
}
