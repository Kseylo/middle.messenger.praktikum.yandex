import Router, { Block, type BlockProps } from '@/shared/lib'
import styles from './link.module.css'

const template = `
<a href='{{href}}' class="${styles.link} {{#if active}} ${styles.linkActive} {{/if}} {{className}}">{{{children}}}</a>
`

interface LinkProps extends BlockProps {
  href: string
  active?: boolean
  children?: unknown
  className?: string
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (event) => {
          event.preventDefault()
          Router.go(this.props.href)
        },
      },
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
