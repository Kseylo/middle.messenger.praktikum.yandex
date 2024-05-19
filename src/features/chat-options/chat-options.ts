import { Block, type BlockProps } from '@/shared/lib'
import { Button } from '@/shared/ui'

// language=hbs
const template = `
{{{button}}}
`

const verticalDotsIcon = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='icon'>
  <circle cx='12' cy='12' r='1' />
  <circle cx='12' cy='5' r='1' />
  <circle cx='12' cy='19' r='1' />
</svg>
`

export class ChatOptions extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      button: new Button({
        children: verticalDotsIcon,
        variant: 'ghost',
      }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
