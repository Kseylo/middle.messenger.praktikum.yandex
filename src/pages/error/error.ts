import { Block } from '@/shared/lib/block'
import styles from './error.module.css'

const template = `
<main class='${styles.container}'>
  <div>
    <h1 class='${styles.code}'>{{code}}</h1>
    <p class='${styles.description}'>{{description}}</p>
  </div>
  <a href='/chat'>Назад к чатам</a>
</main>

`

export class Error extends Block {
  render() {
    return this.compile(template, this.props)
  }
}
