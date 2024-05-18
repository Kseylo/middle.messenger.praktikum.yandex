import { Block, BlockProps } from '@/shared/lib/block'
import styles from './input.module.css'

// language=hbs
const template = `
  <input
    placeholder='{{placeholder}}'
    id='{{id}}'
    class='${styles.input}'
    name='{{name}}'
    type="{{type}}"
    autocomplete="false"
  />
`

export interface InputProps extends BlockProps {
  placeholder?: string
  id?: string
  name?: string
  type?: string
}

export class Input extends Block<InputProps> {
  render() {
    return this.compile(template, this.props)
  }
}
