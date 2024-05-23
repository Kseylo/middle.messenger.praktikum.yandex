import { Block, BlockProps } from '@/shared/lib/block'
import styles from './chat-header.module.css'

interface ChatHeaderProps extends BlockProps {
  children: Block | Block[]
  additionalClass?: string
}

export class ChatHeader extends Block<ChatHeaderProps> {
  render() {
    return this.compile(
      `<header class='${styles.header} ${this.props.additionalClass}'>{{{children}}}</header>`,
      this.props,
    )
  }
}
