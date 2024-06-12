import { BaseAPI } from '../base-api'

interface LoginRequest {
  login: string
  password: string
}

class AuthApi extends BaseAPI {
  constructor() {
    super('auth')
  }

  login(data: LoginRequest) {
    return this.http.post('/signin', {
      data,
    })
  }
}

export const authApi = new AuthApi()
