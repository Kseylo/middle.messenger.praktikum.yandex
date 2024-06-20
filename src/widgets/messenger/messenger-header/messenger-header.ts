import { AddUser, DeleteUser } from '@/features'
import { Block, BlockProps } from '@/shared/lib'
import { ChatHeader, Dialog, DropdownMenu } from '@/shared/ui'
import styles from './messenger-header.module.css'

//language=hbs
const headerTemplate = `
<div class="${styles.header}">
  <h4 class="${styles.title}">Алексей</h4>
    {{{dropdownMenu}}}
    {{{deleteUserDialog}}}
    {{{addUserDialog}}}
</div>
`

class Header extends Block {
  constructor(props: BlockProps) {
    const deleteUserDialog = new Dialog({
      title: 'Удалить пользователя',
      children: new DeleteUser({
        onSubmit: () => {
          deleteUserDialog.hide()
        },
      }),
    })
    const addUserDialog = new Dialog({
      title: 'Добавить пользователя',
      children: new AddUser({
        onSubmit: () => {
          addUserDialog.hide()
        },
      }),
    })
    super({
      ...props,
      dropdownMenu: new DropdownMenu({
        items: [
          {
            title: 'Добавить пользователя',
            onClick: () => addUserDialog.show(),
          },
          {
            title: 'Удалить пользователя',
            onClick: () => deleteUserDialog.show(),
          },
        ],
      }),
      deleteUserDialog,
      addUserDialog,
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
