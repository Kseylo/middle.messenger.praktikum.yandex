import { Block, BlockProps } from '@/shared/lib'
import { ChatHeader, Link } from '@/shared/ui'
import styles from './settings-header.module.css'

// language=hbs
const template = `
  {{{chatHeader}}}
`

interface SettingsHeaderProps extends BlockProps {
  links: Link[]
}

export class SettingsHeader extends Block<SettingsHeaderProps> {
  constructor(props: SettingsHeaderProps) {
    super({
      ...props,
      chatHeader: new ChatHeader({
        additionalClass: styles.header,
        children: props.links,
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
