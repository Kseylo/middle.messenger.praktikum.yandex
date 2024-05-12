import { Block, type BlockProps } from '@/shared/lib/block'
import styles from './error.module.css'

interface ErrorProps extends BlockProps {
  code: number
  description: string
}

const template = `
<main class='${styles.container}'>
  <div>
    <h1 class='${styles.code}'>{{code}}</h1>
    <p class='${styles.description}'>{{description}}</p>
  </div>
  <a href='/chat'>Назад к чатам</a>
</main>

`

export class Error extends Block<ErrorProps> {
  render() {
    return this.compile(template, this.props)
  }
}
