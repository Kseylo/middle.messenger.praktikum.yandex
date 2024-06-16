import { BaseAPI } from '../base-api'

export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

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
}

export default new UserApi()
