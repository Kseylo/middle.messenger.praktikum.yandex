import { Block, BlockProps } from '@/shared/lib/block'
import { Sidebar, UpdateProfile } from '@/widgets'

const template = `
<div class='app-container'>
  {{{ sidebar }}}
  <main class="profile">

    <div class="profile-main">
        {{{ updateProfile }}}
    </div>
  </main>
</div>
`

type ProfileProps = BlockProps

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      ...props,
      sidebar: new Sidebar({}),
      updateProfile: new UpdateProfile(),
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
