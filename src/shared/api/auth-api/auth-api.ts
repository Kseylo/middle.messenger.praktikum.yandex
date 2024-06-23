import { LoginRequest, SignUpRequest } from '@/shared/config'
import { BaseAPI } from '../base-api'

class AuthApi extends BaseAPI {
  constructor() {
    super('auth')
  }

  login(data: LoginRequest) {
    return this.http.post('/signin', { data })
  }

  signup(data: SignUpRequest) {
    return this.http.post('/signup', { data })
  }

  getUser() {
    return this.http.get('/user')
  }

  logout() {
    return this.http.post('/logout')
  }
}

export default new AuthApi()
