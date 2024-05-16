import { Block, type BlockProps } from '@/shared/lib'
import { Input } from './input'
import styles from './input.module.css'

interface InputWithLabelProps extends BlockProps {
  id: string
  label: string
  error?: string
}

const template = `
<div class='${styles.wrapper}'>
  <label for='{{ id }}' class='${styles.label}'>{{ label }}</label>
  {{{ Input }}}
  <span>{{ error }}</span>
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
