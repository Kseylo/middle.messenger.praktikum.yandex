import { LoginForm } from '@/features'
import { Block, type BlockProps } from '@/shared/lib/block'
import styles from './login.module.css'

type LoginProps = BlockProps

// language=hbs
const template = `
    <main class='${styles.container}'>
        {{{loginForm}}}
    </main>
`

export class Login extends Block<LoginProps> {
  constructor(props: LoginProps) {
    super({
      ...props,
      loginForm: new LoginForm({}),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
