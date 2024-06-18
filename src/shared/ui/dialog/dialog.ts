import { Block, BlockProps } from '@/shared/lib'
import styles from './dialog.module.css'

// language=hbs
const template = `
    <div class="${styles.overlay}">
        <div class="${styles.dialog}">
            <header class="${styles.header}">
                <p class="${styles.title}">{{title}}</p>
                {{{close}}}
            </header>
            <div class="${styles.content}">
                {{{children}}}
            </div>
        </div>
    </div>
`

interface DialogProps extends BlockProps {
  title: string
  children: unknown
}

export class Dialog extends Block<DialogProps> {
  constructor(props: DialogProps) {
    super({
      ...props,
      close: new Close({
        events: {
          click: () => this.toggle(false),
        },
      }),
    })
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains(styles.overlay)) {
      this.toggle(false)
      document.removeEventListener('mousedown', this.handleOverlayClick)
    }
  }

  toggle(isOpen: boolean) {
    const dialog = this.getContent()

    if (isOpen) {
      dialog.classList.add(styles.open)
      document.addEventListener('mousedown', this.handleOverlayClick)
    } else {
      dialog.classList.remove(styles.open)
      document.addEventListener('mousedown', this.handleOverlayClick)
    }
  }

  show() {
    this.toggle(true)
  }

  hide() {
    this.toggle(false)
  }

  render() {
    return this.compile(template, this.props)
  }
}

class Close extends Block {
  render() {
    return this.compile(
      `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon ${styles.closeIcon}">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    `,
      this.props,
    )
  }
}
