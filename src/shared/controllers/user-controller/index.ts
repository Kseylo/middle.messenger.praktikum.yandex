import { ChangePasswordData, UserApi } from '@/shared/api'
import type { User } from '@/shared/config'
import { Store } from '@/shared/lib'

class UserController {
  async changePassword(data: ChangePasswordData) {
    try {
      await UserApi.changePassword(data)
    } catch (error) {
      console.log(`Error occurred while changing password`)
    }
  }

  async changeAvatar(file: File) {
    try {
      const { response } = await UserApi.changeAvatar(file)
      Store.setState('user', JSON.parse(response) as User)
    } catch (error) {
      console.log(`Error occurred while changing password`)
    }
  }

  async updateProfile(data: User) {
    try {
      const { response } = await UserApi.updateProfile(data)
      Store.setState('user', JSON.parse(response) as User)
    } catch (error) {
      console.log(`Error occurred while updating profile`)
    }
  }
}

export default new UserController()