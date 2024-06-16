import { User } from '@/shared/config'
import { Block, type BlockProps } from '@/shared/lib'
import { withStore } from '@/shared/lib/store'
import { Avatar, Button } from '@/shared/ui'
import styles from './update-photo.module.css'

// language=hbs
const template = `
<form class='${styles.form}'>
  {{{avatar}}}
  <div class="${styles.wrapper}">
    <h1 class='${styles.name}'>{{displayName}}</h1>
      {{{button}}}
  </div>
</form>
`

interface UpdatePhotoProps extends BlockProps {
  name: string
}

class UpdatePhoto extends Block<UpdatePhotoProps> {
  constructor(props: UpdatePhotoProps) {
    const user = props.user as User
    super({
      ...props,
      displayName:
        user.display_name ?? `${user.first_name} ${user.second_name}`,
      avatar: new Avatar({ width: 80, height: 80, src: user.avatar }),
      button: new Button({ children: 'Сменить фото' }),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withUser = withStore((state) => ({ user: state.user }))
export default withUser(UpdatePhoto as typeof Block)
