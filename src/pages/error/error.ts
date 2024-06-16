import { Block, BlockProps } from '@/shared/lib/block'
import { Link } from '@/shared/ui'
import styles from './error.module.css'

const template = `
<main class='${styles.container}'>
  <div>
    <h1 class='${styles.code}'>{{code}}</h1>
    <p class='${styles.description}'>{{description}}</p>
  </div>
  {{{linkToChat}}}
</main>

`

type ErrorProps = BlockProps

export class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super({
      ...props,
      linkToChat: new Link({
        children: 'Назад к чатам',
        href: '/chat',
        active: true,
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
