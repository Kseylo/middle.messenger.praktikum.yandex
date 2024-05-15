import { Block, BlockProps } from '@/shared/lib/block'
import styles from './input.module.css'

interface InputProps extends BlockProps {
  placeholder?: string
  label?: string
  id?: string
  name?: string
  type?: string
}

const template = `
<div class='${styles.wrapper}'>
  <label for='{{id}}' class='${styles.label}'>{{label}}</label>
  <input
    placeholder='{{placeholder}}'
    id='{{id}}'
    class='${styles.input}'
    name='{{name}}'
    type="{{type}}"
  />
</div>
`

export class Input extends Block<InputProps> {
  render() {
    return this.compile(template, this.props)
  }
}
