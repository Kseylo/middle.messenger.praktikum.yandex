import { Block, type BlockProps } from '@/shared/lib/block'
import styles from './form-input.module.css'

const template = `
<div class='${styles.container}'>
  <label for='{{id}}' class='${styles.label}'>{{label}}</label>
  <input
    placeholder='{{placeholder}}'
    id='{{id}}'
    class='${styles.input}'
    name='{{name}}'
  />
</div>
`

interface FormInputProps extends BlockProps {
  id: string
  label: string
  placeholder: string
  name: string
}

export class FormInput extends Block<FormInputProps> {
  render() {
    return this.compile(template, this.props)
  }
}
