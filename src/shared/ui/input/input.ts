import { Block, BlockProps } from '@/shared/lib/block'
import styles from './input.module.css'

// language=hbs
const template = `
  <input
    placeholder='{{placeholder}}'
    id='{{id}}'
    class='${styles.input}'
    name='{{name}}'
    type='{{type}}'
    value='{{value}}'
    autocomplete="false"
  />
`

export interface InputProps extends BlockProps {
  placeholder?: string
  id?: string
  name?: string
  type?: string
  pattern?: string
  value?: string
}

export class Input extends Block<InputProps> {
  render() {
    return this.compile(template, this.props)
  }
}
