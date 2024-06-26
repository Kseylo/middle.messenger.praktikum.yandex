import { Block } from '@/shared/lib'
import { Input, type InputProps } from './input'
import styles from './input.module.css'

export interface InputWithLabelProps extends InputProps {
  id: string
  label: string
  errorMessage?: string
}

// language=hbs
const template = `
<div class='${styles.wrapper}' data-error='{{#if errorMessage}}true{{else}}false{{/if}}'>
  <label for='{{id}}' class='${styles.label}'>{{label}}</label>
  {{{Input}}}
  <span class='${styles.error}'>{{errorMessage}}</span>
</div>
`

export class InputWithLabel extends Block<InputWithLabelProps> {
  constructor(props: InputWithLabelProps) {
    super({ ...props, Input: new Input({ ...props }) })
  }

  render() {
    return this.compile(template, this.props)
  }
}
