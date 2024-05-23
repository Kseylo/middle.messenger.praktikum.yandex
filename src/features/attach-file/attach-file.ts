import { Block, BlockProps } from '@/shared/lib'
import { Button } from '@/shared/ui'

// language=hbs
const template = `
{{{button}}}
`

// language=hbs
const attachIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
`

export class AttachFile extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      button: new Button({
        children: attachIcon,
        variant: 'ghost',
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
