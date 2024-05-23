import { Block, type BlockProps } from '@/shared/lib'
import { Avatar, Button } from '@/shared/ui'
import styles from './update-photo.module.css'

// language=hbs
const template = `
<form class='${styles.form}'>
  {{{avatar}}}
  <div class="${styles.wrapper}">
    <h1 class='${styles.name}'>{{name}}</h1>
      {{{button}}}
  </div>
</form>
`

interface UpdatePhotoProps extends BlockProps {
  name: string
}

export class UpdatePhoto extends Block<UpdatePhotoProps> {
  constructor(props: UpdatePhotoProps) {
    super({
      ...props,
      avatar: new Avatar({ width: 80, height: 80 }),
      button: new Button({ children: 'Сменить фото' }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
