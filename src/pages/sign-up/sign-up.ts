import { SignUpForm } from '@/features'
import { Block, BlockProps } from '@/shared/lib/block'
import styles from './sign-up.module.css'

// language=hbs
const template = `<main class='${styles.container}'>{{{signUpForm}}}</main>`

export class SignUp extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      signUpForm: new SignUpForm({}),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
