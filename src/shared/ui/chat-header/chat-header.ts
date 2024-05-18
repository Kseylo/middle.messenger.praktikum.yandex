import { Block } from '@/shared/lib/block'
import styles from './chat-header.module.css'

//
// <a href='/profile' class='sidebar-link sidebar-link__active'>Профиль</a>
// <a href='/account' class='sidebar-link'>Аккаунт</a>

export class ChatHeader extends Block {
  render() {
    return this.compile(
      `<header class='${styles.header}'>{{{content}}}</header>`,
      this.props,
    )
  }
}
