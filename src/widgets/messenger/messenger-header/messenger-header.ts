import { ChatOptions, CreateChat } from '@/features'
import { Block, BlockProps } from '@/shared/lib'
import { ChatHeader, Dialog, DropdownMenu } from '@/shared/ui'
import styles from './messenger-header.module.css'

//language=hbs
const headerTemplate = `
<div class="${styles.header}">
  <h4 class="${styles.title}">Алексей</h4>
    {{{dropdownMenu}}}
  {{{chatOptions}}}
</div>
`

class Header extends Block {
  constructor(props: BlockProps) {
    // const createChatDialog = new Dialog({
    //   title: 'Добавить новый чат',
    //   children: new CreateChat({
    //     onSubmit: () => {
    //       createChatDialog.hide()
    //     },
    //   }),
    // })
    super({
      ...props,
      dropdownMenu: new DropdownMenu({
        items: [
          {
            title: 'Добавить пользователя',
            onClick: () => console.log('add user'),
          },
          {
            title: 'Удалить пользователя',
            onClick: () => console.log('delete user'),
          },
        ],
      }),
    })
  }

  render() {
    return this.compile(headerTemplate, this.props)
  }
}

// language=hbs
const template = `
  {{{chatHeader}}}
`

export class MessengerHeader extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      chatHeader: new ChatHeader({
        additionalClass: styles.header,
        children: new Header({}),
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
