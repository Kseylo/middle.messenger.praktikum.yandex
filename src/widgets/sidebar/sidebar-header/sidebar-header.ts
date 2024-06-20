import { CreateChat } from '@/features'
import { Routes, User } from '@/shared/config'
import { Block, BlockProps, isEqual } from '@/shared/lib'
import { withStore } from '@/shared/lib/store'
import { Avatar, Dialog, DropdownMenu, Link, SearchInput } from '@/shared/ui'
import styles from './sidebar-header.module.css'

// language=hbs
const template = `
    <div class="${styles.wrapper}">
        {{{profileLink}}}
        {{{searchInput}}}
        {{{dropdownMenu}}}
        {{{createChatDialog}}}
    </div>
`

interface SidebarHeaderProps extends BlockProps {
  user?: User
}

class SidebarHeader extends Block<SidebarHeaderProps> {
  constructor(props: SidebarHeaderProps) {
    const user = props.user
    const createChatDialog = new Dialog({
      title: 'Добавить новый чат',
      children: new CreateChat({
        onSubmit: () => {
          createChatDialog.hide()
        },
      }),
    })
    super({
      ...props,
      profileLink: user
        ? new Link({
            href: Routes.Profile,
            children: new Avatar({ width: 40, height: 40, src: user.avatar }),
            className: styles.profileLink,
          })
        : null,
      searchInput: new SearchInput({
        placeholder: 'Поиск',
      }),
      createChatDialog,
      dropdownMenu: new DropdownMenu({
        items: [
          {
            title: 'Добавить новый чат',
            onClick: () => createChatDialog.show(),
          },
        ],
      }),
    })
  }

  componentDidUpdate(
    oldProps: SidebarHeaderProps,
    newProps: SidebarHeaderProps,
  ): boolean {
    if (!isEqual(oldProps, newProps)) {
      if (newProps.user) {
        this.setProps({
          profileLink: new Link({
            href: Routes.Profile,
            children: new Avatar({
              width: 40,
              height: 40,
              src: newProps.user.avatar,
            }),
            className: styles.profileLink,
          }),
        })
      }
    }
    return super.componentDidUpdate(oldProps, newProps)
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withUser = withStore((state) => ({ user: state.user }))
export default withUser(SidebarHeader as typeof Block)
