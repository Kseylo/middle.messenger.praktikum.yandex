import type { ChangePasswordData, UpdateProfileData } from '@/shared/config'
import { BaseAPI } from '../base-api'

class UserApi extends BaseAPI {
  constructor() {
    super('user')
  }

  changePassword(data: ChangePasswordData) {
    return this.http.post('/password', { data })
  }

  changeAvatar(file: File) {
    const formData = new FormData()
    formData.append('avatar', file)
    return this.http.put('/profile/avatar', {
      data: formData,
    })
  }

  updateProfile(data: UpdateProfileData) {
    return this.http.put('/profile', { data })
  }
}

export default new UserApi()
