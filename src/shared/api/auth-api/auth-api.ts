import { BaseAPI } from '../base-api'

export interface LoginRequest {
  login: string
  password: string
}

export interface SignUpRequest {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  password: string
}

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
