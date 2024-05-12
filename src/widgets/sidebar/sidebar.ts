import { Block } from '@/shared/lib/block'

const template = `
<aside class="sidebar">
  <div class="sidebar-header">
    <a href="/profile" style="min-width: 40px">
      {{> Avatar width='40' height='40' }}
    </a>
    {{> SearchInput placeholder='Поиск' }}
  </div>
  {{> ChatList chats=chats }}
</aside>
`

export class Sidebar extends Block {
  render() {
    this.compile(template, this.props)
  }
}
