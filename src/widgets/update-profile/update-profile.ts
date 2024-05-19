import { UpdateInfo, UpdatePhoto } from '@/features'
import { Block } from '@/shared/lib'
import styles from './update-profile.module.css'

// language=hbs
const template = `
    <div class='card ${styles.wrapper}'>
        {{{updatePhoto}}}
        {{{updateInfo}}}
    </div>
`

export class UpdateProfile extends Block {
  constructor() {
    super({
      updatePhoto: new UpdatePhoto({ name: 'Алексей Ложкин' }),
      updateInfo: new UpdateInfo({}),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
