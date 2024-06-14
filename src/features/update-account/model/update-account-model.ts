import { type ChangePasswordData, UserApi } from '@/shared/api'

class UpdateAccountModel {
  async changePassword(data: ChangePasswordData) {
    try {
      await UserApi.changePassword(data)
    } catch (error) {
      console.log(`Error occurred while changing password`)
    }
  }
}

export default new UpdateAccountModel()
