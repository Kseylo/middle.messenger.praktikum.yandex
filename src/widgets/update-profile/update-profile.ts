import { UpdateInfo, UpdatePhoto } from '@/features'
import { Block } from '@/shared/lib'

// language=hbs
const template = `
    <div class='profile-update card'>
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
