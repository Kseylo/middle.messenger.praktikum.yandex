import { BaseAPI } from '../base-api'

export interface LoginRequest {
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

  getUser() {
    return this.http.get('/user')
  }
}

export default new AuthApi()
