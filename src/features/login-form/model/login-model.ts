import { authApi } from '@/shared/api'
import { store } from '@/shared/lib'

export class LoginModel {
  static login() {
    authApi.login()
    store.setState('login', {
      login: 'test',
      password: 'test',
    })
  }
}
