import { RESOURCES_URL } from '@/shared/api'
import { Block, BlockProps } from '@/shared/lib/block'
import styles from './avatar.module.css'

const template = `
<img
  src='{{src}}'
  width='{{width}}'
  height='{{height}}'
  class='${styles.avatar}'
  alt='avatar'
/>
`

interface AvatarProps extends BlockProps {
  width: number
  height: number
  src?: string | null
}

export class Avatar extends Block<AvatarProps> {
  render() {
    return this.compile(template, {
      ...this.props,
      src: this.props.src
        ? `${RESOURCES_URL}/${this.props.src}`
        : 'images/avatar-placeholder.avif',
    })
  }
}
