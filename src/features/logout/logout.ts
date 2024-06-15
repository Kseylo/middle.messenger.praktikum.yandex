import { AuthController } from '@/shared/controllers'
import { Block } from '@/shared/lib'
import styles from './logout.module.css'

const template = `
  <form><button class='${styles.button}'>Выйти</button></form>
`

export class Logout extends Block {
  constructor() {
    super({
      events: {
        submit: async (event) => {
          event.preventDefault()
          await AuthController.logout()
        },
      },
    })
  }

  render() {
    return this.compile(template, {})
  }
}
