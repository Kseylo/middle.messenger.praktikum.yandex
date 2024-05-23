import { Block, type BlockProps } from '@/shared/lib'
import styles from './button.module.css'

// language=hbs
const template = `
    <button class='{{className}}' type="{{type}}">{{{children}}}</button>
    `

interface ButtonProps extends BlockProps {
  children: string
  variant?: 'primary' | 'ghost'
  type?: 'button' | 'submit'
}

export class Button extends Block<ButtonProps> {
  render() {
    const className = `${styles.button} ${this.props.variant ? styles[this.props.variant] : styles.primary}`
    const type = this.props.type || 'button'
    return this.compile(template, { ...this.props, className, type })
  }
}
