import { User } from '@/shared/config'
import { UserController } from '@/shared/controllers'
import { Block, type BlockProps } from '@/shared/lib'
import { withStore } from '@/shared/lib/store'
import { Avatar, Button, FileInput } from '@/shared/ui'
import styles from './update-photo.module.css'

// language=hbs
const template = `
    <form class='${styles.form}'>
        {{{avatar}}}
        <div class="${styles.wrapper}">
            <h1 class='${styles.name}'>{{displayName}}</h1>
            {{{button}}}
        </div>
        {{{fileInput}}}
    </form>
`

interface UpdatePhotoProps extends BlockProps {
  name: string
}

class UpdatePhoto extends Block<UpdatePhotoProps> {
  constructor(props: UpdatePhotoProps) {
    const user = props.user as User
    const fileInput = new FileInput({
      onChange: (file) => this.onFileChange(file),
    })
    super({
      ...props,
      displayName:
        user.display_name ?? `${user.first_name} ${user.second_name}`,
      avatar: new Avatar({ width: 80, height: 80, src: user.avatar }),
      button: new Button({
        children: 'Сменить фото',
        events: {
          click: () => fileInput.getContent().click(),
        },
      }),
      fileInput,
    })
  }

  async onFileChange(file: File) {
    await UserController.changeAvatar(file)
  }

  render() {
    return this.compile(template, this.props)
  }
}

const withUser = withStore((state) => ({ user: state.user }))
export default withUser(UpdatePhoto as typeof Block)
