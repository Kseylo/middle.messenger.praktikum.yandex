import { Block, BlockProps } from '@/shared/lib/block'
import styles from './avatar.module.css'

const template = `
<img
  src='images/avatar-placeholder.avif'
  width='{{width}}'
  height='{{height}}'
  class='${styles.avatar}'
  alt='avatar'
/>
`

interface AvatarProps extends BlockProps {
  width: number
  height: number
}

export class Avatar extends Block<AvatarProps> {
  render() {
    return this.compile(template, this.props)
  }
}
