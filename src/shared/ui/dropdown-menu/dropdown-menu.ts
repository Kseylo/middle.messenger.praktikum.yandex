import { Block, BlockProps } from '@/shared/lib'
import { Button } from '@/shared/ui'
import styles from './dropdown-menu.module.css'

// language=hbs
const template = `
  <div class="${styles.wrapper} {{#if isOpen}}${styles.open}{{/if}}">
    {{{ iconButton }}}
      <ul class="${styles.itemList}" id="dropdown-menu">
          {{{items}}}
      </ul>
  </div>
`

const verticalDotsIcon = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='icon'>
  <circle cx='12' cy='12' r='1' />
  <circle cx='12' cy='5' r='1' />
  <circle cx='12' cy='19' r='1' />
</svg>
`

export interface DropdownMenuProps extends BlockProps {
  items?: DropdownMenuItemProps[]
}

export class DropdownMenu extends Block<DropdownMenuProps> {
  constructor(props: DropdownMenuProps) {
    super({
      ...props,
      iconButton: new Button({
        children: verticalDotsIcon,
        variant: 'ghost',
        events: {
          click: () => this.toggle(true),
        },
      }),
      items: props.items?.map(
        (item) =>
          new DropdownMenuItem({
            title: item.title,
            events: {
              click: () => {
                if (item.onClick) {
                  item.onClick()
                }
                this.toggle(false)
              },
            },
          }),
      ) as unknown as DropdownMenuItemProps[],
    })
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  handleClickOutside(event: MouseEvent) {
    const tooltip = this.getContent()
    if (!tooltip.contains(event.target as Node)) {
      this.toggle(false)
    }
  }

  toggle(isOpen: boolean) {
    this.setProps({ isOpen })
    if (isOpen) {
      document.addEventListener('mousedown', this.handleClickOutside)
    } else {
      document.removeEventListener('mousedown', this.handleClickOutside)
    }
  }

  render() {
    return this.compile(template, this.props)
  }
}

interface DropdownMenuItemProps extends BlockProps {
  title: string
  onClick?: () => void
}

class DropdownMenuItem extends Block<DropdownMenuItemProps> {
  render() {
    return this.compile(
      `<li class="${styles.item}">${this.props.title}</li>`,
      this.props,
    )
  }
}
