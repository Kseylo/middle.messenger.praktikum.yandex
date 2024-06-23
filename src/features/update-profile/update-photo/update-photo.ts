import { User } from '@/shared/config'
import { UserController } from '@/shared/controllers'
import { Block, type BlockProps } from '@/shared/lib'
import { isEqual } from '@/shared/lib'
import { withStore } from '@/shared/lib/store'
import { Avatar, Button, FileInput } from '@/shared/ui'
import styles from './update-photo.module.css'

// language=hbs
const template = `
    <form class='${styles.form}'>
        {{{avatar}}}
        <div class="${styles.wrapper}">
            <h1 class='${styles.name}'>{{display_name}}</h1>
            {{{button}}}
        </div>
        {{{fileInput}}}
    </form>
`

interface UpdatePhotoProps extends BlockProps {
  avatar: Avatar
  user?: User
}

class UpdatePhoto extends Block<UpdatePhotoProps> {
  constructor(props: UpdatePhotoProps) {
    const user = props.user as User
    const fileInput = new FileInput({
      onChange: (file) => this.onFileChange(file),
    })
    super({
      ...props,
      display_name:
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

  componentDidUpdate(oldProps: UpdatePhotoProps, newProps: UpdatePhotoProps) {
    if (!isEqual(oldProps, newProps)) {
      if (newProps.user) {
        this.setProps({
          display_name: newProps.user.display_name,
          avatar: new Avatar({
            width: 80,
            height: 80,
            src: newProps.user.avatar,
          }),
        })
      }
    }

    return true
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
