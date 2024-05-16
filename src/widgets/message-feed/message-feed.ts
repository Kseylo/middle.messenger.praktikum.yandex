import { Block, BlockProps } from '@/shared/lib/block'

const template = `
  <div>
 {{{ Message }}}
</div>
`

type MessageFeedProps = BlockProps

export class MessageFeed extends Block<BlockProps> {
  constructor(props: MessageFeedProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props)
  }
}
