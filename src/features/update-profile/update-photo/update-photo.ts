import { Block, type BlockProps } from '@/shared/lib'
import { Avatar } from '@/shared/ui'

// language=hbs
const template = `
<form class='profile-update__avatar'>
  {{{avatar}}}
  <div>
    <h1 class='profile-name'>{{name}}</h1>
    <button class='button button-primary' name='avatar'>Сменить фото</button>
  </div>
</form>
`

interface UpdatePhotoProps extends BlockProps {
  name: string
}

export class UpdatePhoto extends Block<UpdatePhotoProps> {
  constructor(props: UpdatePhotoProps) {
    super({ ...props, avatar: new Avatar({ width: 80, height: 80 }) })
  }

  render() {
    return this.compile(template, this.props)
  }
}
