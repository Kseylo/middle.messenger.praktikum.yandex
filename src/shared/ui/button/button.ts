import { Block, type BlockProps } from '@/shared/lib'
import styles from './button.module.css'

// language=hbs
const template = `
<button class='${styles.button}'>{{text}}</button>
`

interface ButtonProps extends BlockProps {
  text: string
}

export class Button extends Block<ButtonProps> {
  render() {
    return this.compile(template, this.props)
  }
}
