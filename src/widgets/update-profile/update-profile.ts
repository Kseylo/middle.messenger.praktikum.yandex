import { UpdateInfo, UpdatePhoto } from '@/features'
import { Logout } from '@/features/logout'
import { Block } from '@/shared/lib'
import styles from './update-profile.module.css'

// language=hbs
const template = `
    <div class='card ${styles.wrapper}'>
        {{{updatePhoto}}}
        {{{updateInfo}}}
        {{{logout}}}
    </div>
`

export class UpdateProfile extends Block {
  constructor() {
    super({
      updatePhoto: new UpdatePhoto({}),
      updateInfo: new UpdateInfo({}),
      logout: new Logout(),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
