import { Block } from '@/shared/lib'
import styles from './media-message.module.css'

// language=hbs
const template = `
    <div class='${styles.message}'>
        <img src='images/camera.avif' class='${styles.image}' alt='media-image' />
        <div class='${styles.time}'>{{time}}</div>
    </div>
`

export class MediaMessage extends Block {
  render() {
    return this.compile(template, this.props)
  }
}
