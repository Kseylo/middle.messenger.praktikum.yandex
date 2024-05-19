import { Block, type BlockProps } from '@/shared/lib'
import styles from './button.module.css'

// language=hbs
const template = `
    <button class='{{className}}'>{{{children}}}</button>
    `

interface ButtonProps extends BlockProps {
  children: string
  variant?: 'primary' | 'ghost'
}

export class Button extends Block<ButtonProps> {
  render() {
    const className = `${styles.button} ${this.props.variant ? styles[this.props.variant] : styles.primary}`
    return this.compile(template, { ...this.props, className })
  }
}
