import { Block, BlockProps } from '@/shared/lib/block'
import styles from './message.module.css'

interface MessageProps extends BlockProps {
  message: string
  time: string
}

const template = `
<div class='${styles.wrapper}'>
  <p class'${styles.message}'>{{message}}</p>
  <span class='${styles.time}'>{{time}}</span>
  <svg xmlns="http://www.w3.org/2000/svg" 
  width="24"
  height="24" 
  viewBox="0 0 24 24" 
  class="icon ${styles.icon}">
  <path d="M18 6 7 17l-5-5"/>
  <path d="m22 10-7.5 7.5L13 16"/>
  </svg>
</div>
`

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({ ...props })
  }

  render() {
    return this.compile(template, this.props)
  }
}
