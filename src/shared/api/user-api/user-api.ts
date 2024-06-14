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
}

export default new UserApi()
